import { use } from 'react';
import type { Metadata } from 'next';

// Declare that this page is dynamic and will not be statically generated
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'GitHub Repositories',
  description: 'View GitHub repositories for a user',
};

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

// Deine Page-Komponente
export default async function ReposPage({ searchParams }: { searchParams: any }) {
  // Warten auf die Auflösung von searchParams, falls asynchron
  const params = await searchParams;

  const resolvedParams = {
    user: params?.user ?? 'weuritz8u',
    raw: params?.raw ?? 'true',
    language: params?.language ?? 'true',
    description: params?.description ?? 'true',
  };

  // Handle raw-Parameter
  if (resolvedParams.raw === 'true') {
    const queryString = new URLSearchParams(resolvedParams).toString();
    redirect(`/api/repos_raw?${queryString}`);
  }

  // Repositories abrufen
  const res = await fetch(`https://api.github.com/users/${resolvedParams.user}/repos`, {
    next: { revalidate: 60000 }, // Cache und Revalidierung alle 60.000 Sekunden
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
    cache: 'force-cache',
  });

  if (!res.ok) {
    // Fehler beim Abrufen der Repositories
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">User not found or API rate limit exceeded!</h1>
        <p className="mt-2">Status: {res.status}</p>
      </div>
    );
  }

  const repos: Repository[] = await res.json();

  if (repos.length === 0) {
    return <p>No repositories found for this user.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Public repositories by <span className="text-blue-600">{resolvedParams.user}</span>
      </h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            {resolvedParams.language === 'true' && (
              <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
            )}
            {resolvedParams.description === 'true' && (
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            )}
          </tr>
        </thead>
        <tbody>
          {repos.map((repo) => (
            <tr key={repo.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {repo.name}
                </a>
              </td>
              {resolvedParams.language === 'true' && (
                <td className="border border-gray-300 px-4 py-2">{repo.language || '-'}</td>
              )}
              {resolvedParams.description === 'true' && (
                <td className="border border-gray-300 px-4 py-2">{repo.description || '-'}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
