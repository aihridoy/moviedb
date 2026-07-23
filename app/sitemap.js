const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function sitemap() {
    const routes = ["", "/compare-movies", "/watchlists", "/login", "/register"];
    return routes.map((path) => ({
        url: `${BASE}${path}`,
        lastModified: new Date(),
    }));
    // ponytail: static routes only; add dynamic /movie/[id] entries when there's a
    // reason to index them (needs a TMDB listing fetch).
}
