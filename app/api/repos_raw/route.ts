import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

// Initialisiere CORS
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],
  origin: '*', // oder deine Domain(s)
});

// Hilfsfunktion um Middleware zu verwenden
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// API Route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  res.json({ message: 'CORS ist aktiv!' });
}

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
