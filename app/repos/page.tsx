async function getPublicRepos() {
    const res = await fetch("https://api.github.com/users/weuritz8u/repos");
  
    if (!res.ok) {
      throw new Error("Error when retrieving the data");
    }
  
    return res.json();
}
  
  export default async function ReposPage() {
    const repos = await getPublicRepos();
  
    return (
      <div>
        <h1>my public repsitorys</h1>
        <ul>
          {repos.map((repo: any) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank">{repo.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
}
  