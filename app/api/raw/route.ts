// api/raw/route.ts

// to generate a CSV Table with the Repository Data from a User

import { getSearchParams, getGHrepodata, csvEscape } from '../../lib/fetching/main';

export async function GET(request: Request) {

  const {
    user,
    show_id,
    show_name,
    show_user,
    includeLanguage,
    includeDescription,
    show_link
  } = getSearchParams(request);

  try {
    const repos = await getGHrepodata(user)

    if (repos === null) {
      return new Response("Could not retrieve Repository Data", { status: 404 });
    }

    const includeId = show_id === 'true';
    const includeName = show_name === "true";
    const includeUser = show_user === 'true';
    const includeLang = includeLanguage === 'true';
    const includeDesc = includeDescription === 'true';
    const includeLink = show_link === 'true';

    const csvLines = [ // Dynamischer Header
      [
        ...(includeId ? ["ID"] : []),
        ...(includeName ? ["Name"] : []),
        ...(includeUser ? ["Username"] : []),
        ...(includeLang ? ["Language"] : []),
        ...(includeDesc ? ["Description"] : []),
        ...(includeLink ? ["Link"] : [])
      ].join(","),

      // Repos
      ...repos.map((r) => {
        const name = csvEscape(r.name);
        const lang = csvEscape(r.language || "-");
        const desc = csvEscape(r.description || "-");
        const linkc = csvEscape(r.html_url);

        return [
          ...(includeId ? [r.id] : []),
          ...(includeName ? [name] : []),
          ...(includeUser ? [user] : []),
          ...(includeLang ? [lang] : []),
          ...(includeDesc ? [desc] : []),
          ...(includeLink ? [linkc] : []),
        ].join(",");
      }),
    ];

    const response = new Response(csvLines.join("\n"), {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        //"Content-Disposition": `attachment; filename="${user}_repos.csv"`,
        // to download the table as csv file!
      },
    });

    return response;
  } catch (err) {
    console.error("Error generating CSV:", err);
    return new Response('Something went wrong', { status: 500 })
  }
}
