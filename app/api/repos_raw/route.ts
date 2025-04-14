import { NextResponse } from "next/server";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const includeDescription = searchParams.get("description") || "true";

  const res = await fetch(`https://api.github.com/users/${user}/repos`, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 60000 }, // Cache and revalidate every 60.000 seconds, 1.000 minutes, 16,6 hours
    cache: "force-cache",
  });

  if (!res.ok) {
    return new NextResponse("Error fetching repos", { status: res.status });
  }

  const repos: Repository[] = await res.json();

  const csvLines = [
    "Name,Language,Description",
    ...repos.map((r) => {
    
      const description = includeDescription && r.description ? r.description : "-";

      return `${r.name},${r.language || "-"},${description}`;
    }),
  ];

  return new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      //"Content-Disposition": `attachment; filename="${user}_repos.csv"`,
    },
  });
}
