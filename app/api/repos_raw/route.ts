import { NextResponse } from "next/server";

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

export async function GET(request: Request) {
  // CORS-Header manuell setzen
  const response = await fetchRepos(request);

  if (!response) {
    return new NextResponse("Error fetching repos", { status: 500 });
  }

  // Gib die CORS-Header zusammen mit den Daten zurück
  const csvData = await response;

  const nextResponse = new NextResponse(csvData, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*", // CORS aktivieren
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });

  return nextResponse;
}

async function fetchRepos(request: Request) {
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
    console.error("Fehler beim Abrufen der Repos:", apiRes.statusText);
    return null;
  }

  const repos: Repository[] = await apiRes.json();

  const csvLines = [
    "Name,Language,Description",
    ...repos.map((r) => {
      const description = includeDescription && r.description ? r.description : "-";
      return `${r.name},${r.language || "-"},${description}`;
    }),
  ];

  return csvLines.join("\n");
}
