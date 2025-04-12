// app/repos/page.tsx

export const dynamic = "force-dynamic"; // optional: disables full static rendering

export default async function ReposPage({
  searchParams,
}: {
  searchParams?: { user?: string };
}) {
  const username = searchParams?.user || "weuritz8u";

  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">User not found!</h1>
      </div>
    );
  }

  const repos = await res.json();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        public repositories by <span className="text-blue-600">{username}</span>
      </h1>

      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Sprache</th>
          </tr>
        </thead>

        <tbody>
          {repos.map((repo: any) => (
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
              <td className="border border-gray-300 px-4 py-2">
                {repo.language || "–"}
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
