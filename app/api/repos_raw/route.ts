import { NextResponse } from "next/server";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";

  const res = await fetch(`https://api.github.com/users/${user}/repos`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  });

  if (!res.ok) {
    return new NextResponse("Error fetching repos", { status: res.status });
  }

  const repos: Repository[] = await res.json();

  const csvLines = [
    "Name,Language",
    ...repos.map((r) => `${r.name},${r.language || "-"}`),
  ];

  return new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      //"Content-Disposition": `attachment; filename="${user}_repos.csv"`,
    },
  });
}
