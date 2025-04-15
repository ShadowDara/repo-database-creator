import { redirect } from "next/navigation";
import type { Metadata } from "next";

// Declare that this page is dynamic and will not be statically generated
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GitHub Repositories",
  description: "View GitHub repositories for a user",
};

interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
}

export default async function ReposPage({
  searchParams,
}: {
  searchParams: Promise<{
    user?: string;
    raw?: string;
    language?: string;
    description?: string;
  }>;
}) {
  try {
    // Warten auf das Auflösen des Promises
    const params = await searchParams;

    const resolvedParams = {
      user: params?.user ?? "weuritz8u",
      raw: params?.raw ?? "true",
      language: params?.language ?? "true",
      description: params?.description ?? "true",
    };

    // Handle raw parameter (Redirect if true)
    if (resolvedParams.raw === "true") {
      const queryString = new URLSearchParams(resolvedParams).toString();
      redirect(`/api/repos_raw?${queryString}`);
    }

    // Fetch repositories for the user
    const res = await fetch(`https://api.github.com/users/${resolvedParams.user}/repos`, {
      next: { revalidate: 60000 }, // Cache and revalidate every 60.000 seconds
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      // Handle fetch errors
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-600">User not found or API rate limit exceeded!</h1>
          <p className="mt-2">Status: {res.status}</p>
        </div>
      );
    }

    const repos: Repository[] = await res.json();

    // Render repositories or no repositories found message
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
              {resolvedParams.language === "true" && (
                <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
              )}
              {resolvedParams.description === "true" && (
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
                {resolvedParams.language === "true" && (
                  <td className="border border-gray-300 px-4 py-2">{repo.language || "-"}</td>
                )}
                {resolvedParams.description === "true" && (
                  <td className="border border-gray-300 px-4 py-2">{repo.description || "-"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Error fetching repositories</h1>
        <p className="mt-2">Please try again later.</p>
      </div>
    );
  }
}
