import { NextResponse } from "next/server";
import Cors from "cors";

// CORS initialisieren
const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: "*", // Hier kannst du auch eine spezifische URL angeben, wenn du möchtest
});

// Hilfsfunktion, um CORS Middleware auszuführen
function runMiddleware(req: Request, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, null, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

// API-Route: Einzige GET-Funktion
export async function GET(request: Request) {
  console.log("GET-Anfrage empfangen");

  // CORS Middleware ausführen
  try {
    console.log("CORS Middleware wird ausgeführt...");
    await runMiddleware(request, cors);
    console.log("CORS Middleware abgeschlossen");
  } catch (error) {
    console.error("Fehler bei CORS:", error);
    return new NextResponse("CORS Fehler", { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const user = searchParams.get("user") || "weuritz8u";
  const includeDescription = searchParams.get("description") || "true";

  console.log(`Abrufen der Repos für Benutzer: ${user}`);

  // GitHub API für Repositories
  const apiRes = await fetch(`https://api.github.com/users/${user}/repos`, {
    headers: { Accept: "application/vnd.github.v3+json" },
    next: { revalidate: 60000 }, // Cache und Revalidate alle 60.000 Sekunden
    cache: "force-cache",
  });

  if (!apiRes.ok) {
    console.error("Fehler beim Abrufen der Repos:", apiRes.statusText);
    return new NextResponse("Error fetching repos", { status: apiRes.status });
  }

  const repos: Repository[] = await apiRes.json();
  console.log("Repos erfolgreich abgerufen:", repos);

  const csvLines = [
    "Name,Language,Description",
    ...repos.map((r) => {
      const description = includeDescription && r.description ? r.description : "-";
      return `${r.name},${r.language || "-"},${description}`;
    }),
  ];

  console.log("CSV-Daten generiert:");

  // CORS Header setzen und die CSV-Daten zurückgeben
  const response = new NextResponse(csvLines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      // Falls du das als Datei anbieten möchtest, kannst du hier das Header hinzufügen:
      // "Content-Disposition": `attachment; filename="${user}_repos.csv"`,
    },
  });

  console.log("Antwort gesendet:", response);

  return response;
}
