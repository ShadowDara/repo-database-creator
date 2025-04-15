// Diese Datei wird als Client-Komponente verwendet
'use client'; // Direktive für Client-Komponente

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Import aus 'next/navigation' statt 'next/router'
import { Metadata } from 'next';

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

export default function ReposPage({ searchParams }: { searchParams: any }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<any>({});
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRepos = async () => {
      try {
        // Parameter auflösen
        const params = searchParams || {};
        const resolved = {
          user: params?.user ?? 'weuritz8u',
          raw: params?.raw ?? 'false',
          language: params?.language ?? 'true',
          description: params?.description ?? 'true',
        };

        setResolvedParams(resolved);

        // Wenn 'raw' == true, leite weiter
        if (resolved.raw === 'true') {
          const queryString = new URLSearchParams(resolved).toString();
          router.push(`/api/repos_raw?${queryString}`);
          return; // Umleitung durchgeführt, daher zurückkehren
        }

        // Repositories abrufen
        const res = await fetch(`https://api.github.com/users/${resolved.user}/repos`, {
          headers: {
            Accept: 'application/vnd.github.v3+json',
          },
          cache: 'force-cache',
        });

        if (!res.ok) {
          throw new Error('User not found or API rate limit exceeded!');
        }

        const data: Repository[] = await res.json();
        setRepos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [searchParams, router]); // Verwenden von 'useEffect' für die asynchrone Datenverarbeitung und Umleitung

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
      </div>
    );
  }

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
