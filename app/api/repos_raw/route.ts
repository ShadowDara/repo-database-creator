import { NextResponse } from "next/server";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

function sanitizeCSVValue(value: string) {
  const dangerousStart = /^[=+\-@]/;
  if (dangerousStart.test(value)) {
    return `'${value}`; // Apostroph davor
  }
  return value;
}

function csvEscape(value: string) {
  const needsQuotes = /[",\n\r]/.test(value);
  if (needsQuotes) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const includeDescription = searchParams.get("description") || "true";

  // GitHub API für Repositories
  const apiRes = await fetch(`https://api.github.com/users/${user}/repos`, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 60000 }, // Cache und Revalidate alle 60.000 Sekunden
    cache: "force-cache",
  });

  if (!apiRes.ok) {
    return new NextResponse("Error fetching repos", { status: apiRes.status });
  }

  const repos: Repository[] = await apiRes.json();

  const csvLines = [
    "Name,Language,Description",
    ...repos.map((r) => {
      const description = includeDescription && r.description ? r.description : "-";
      const name = csvEscape(sanitizeCSVValue(r.name));
      const lang = csvEscape(r.language || "-");
      const desc = csvEscape(sanitizeCSVValue(r.description || "-"));
      return `${name},${lang || "-"},${desc}`;
    }),
  ];

  const response = new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": `attachment; filename="${user}_repos.csv"`,
    },
  });

  return response;
}
