import { NextResponse } from "next/server";

// Hilfsfunktion, um Repositories abzurufen
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
    return null; // Fehler bei der Anfrage
  }

  const repos = await apiRes.json();

  // CSV-Daten generieren
  const csvLines = [
    "Name,Language,Description",
    ...repos.map((r: any) => {
      const description = includeDescription && r.description ? r.description : "-";
      return `${r.name},${r.language || "-"},${description}`;
    }),
  ];

  return csvLines.join("\n"); // CSV-Daten als Text zurückgeben
}

// API-Route für GET-Anfragen
export async function GET(request: Request) {
  // Repositories abrufen
  const csvData = await fetchRepos(request);

  if (!csvData) {
    return new NextResponse("Error fetching repos", { status: 500 });
  }

  // Erstelle eine neue Response und füge CORS-Header hinzu
  const nextResponse = new NextResponse(csvData, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*", // CORS aktivieren
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Erlaubte Methoden
      "Access-Control-Allow-Headers": "Content-Type", // Erlaubte Header
    },
  });

  return nextResponse;
}
