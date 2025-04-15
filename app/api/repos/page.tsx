// app/repos/page.tsx

import type { Metadata } from "next"

// Declare that this page is dynamic and will not be statically generated
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "GitHub Repositories",
  description: "View GitHub repositories for a user",
}

// Repository interface for type safety
interface Repository {
  id: number
  name: string
  html_url: string
  language: string | null
  description: string | null
}

// Page component with the correct type definition for App Router pages
export default async function ReposPage({
  searchParams,
}: {
  params: Promise<{ repodata: string }>;
  searchParams: Promise<{
    user?: string | undefined;
    raw?: string | undefined;
    language?: string | undefined;
    description?: string | undefined;
  }>
}) {
  const query = await (searchParams).toString();
  const { user = "weuritz8u" } = await searchParams;
  const { raw = "true" } = await searchParams;
  const { language = "true" } = await searchParams;
  const { description = "true" } = await searchParams;

  // Fetch repositories for the user
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos`, {
      next: { revalidate: 60000 }, // Cache and revalidate every 60.000 seconds, 1.000 minutes, 16,6 hours
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      cache: "force-cache"
    })

    if (!res.ok) {
      // catch errors!
      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold text-red-600">User not found or API rate limit exceeded!</h1>
          <p className="mt-2">Status: {res.status}</p>
        </div>
      )
    }

    // Parse the response as a list of repositories
    const repos: Repository[] = await res.json()

    if (repos.length === 0) {
      return (
        <p>No repositories found for this user.</p>
      )
    }
    else {
      if (raw === 'true') {
        return (
          <head>
            <meta httpEquiv="refresh" content={`0;url=repos_raw?${query}`} />
          </head>
        );
      }

      else {
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
              Public repositories by <span className="text-blue-600">{user}</span>
            </h1>

            {repos.length === 0 ? (
              <p>No repositories found for this user.</p>
            ) : (
              <table className="w-full table-auto border-collapse border border-gray-300">

                <thead>
                  <tr className="">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Language</th>
                    {description === "true" && <th className="border border-gray-300 px-4 py-2 text-left">Description</th>}
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
                      {language === "true" && <td className="border border-gray-300 px-4 py-2">{repo.language || "-"}</td>}
                      {description === "true" && <td className="border border-gray-300 px-4 py-2">{repo.description || "-"}</td>}
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        )
      }
    }
  }

  catch (error) {
    console.error("Error fetching repositories:", error)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Error fetching repositories</h1>
        <p className="mt-2">Please try again later.</p>
      </div>
    )
  }
}
