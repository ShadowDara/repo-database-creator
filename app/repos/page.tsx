// app/repos/page.tsx

import { Metadata } from "next";

// Declare that this page is dynamic and will not be statically generated
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "GitHub Repositories",
  description: "View GitHub repositories for a user",
};

// Repository interface for type safety
interface Repository {
  id: number;
  name: string;
  html_url: string;
  language: string | null;
}

// Page component receiving the props (searchParams)
export default async function ReposPage({
  searchParams,
}: {
  searchParams: { user?: string | string[] };
}) {
  // Ensure 'user' is a string or fallback to default username
  const username = typeof searchParams.user === "string" ? searchParams.user : "weuritz8u";

  try {
    // Fetch repositories from GitHub API
    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    // If the response is not OK, show an error message
    if (!res.ok) {
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-600">
            User not found or API rate limit exceeded!
          </h1>
          <p className="mt-2">Status: {res.status}</p>
        </div>
      );
    }

    // Parse the response as a list of repositories
    const repos: Repository[] = await res.json();

    // Return the component with the fetched data
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Public repositories by <span className="text-blue-600">{username}</span>
        </h1>

        {repos.length === 0 ? (
          <p>No repositories found for this user.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
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
                  <td className="border border-gray-300 px-4 py-2">{repo.language || "–"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
