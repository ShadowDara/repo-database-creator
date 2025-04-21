// lib/github.ts
export async function getRepoCount(user: string): Promise<number | null> {
  const response = await fetch(`https://api.github.com/users/${user}`, {
    next: { revalidate: 86400 },
    cache: "force-cache",
  })

  if (!response.ok) {
    throw new Error('GitHub user not found')
  }

  const data = await response.json()
  return data.public_repos
}
