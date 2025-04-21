// lib/url.ts
export function getSearchParams(request: Request) {
    const { searchParams } = new URL(request.url);
  
    return {
      user: searchParams.get("user") || "shadowdara",
      includeDescription: searchParams.get("description") || "true",
      includeLanguage: searchParams.get("language") || "true",
      show_name: searchParams.get("show_name") || "true",
      show_user: searchParams.get("show_user") || "false",
      show_link: searchParams.get("link") || "false",
      show_id: searchParams.get("id") || "false",
      theme: searchParams.get("theme") || "default",
    };
}
