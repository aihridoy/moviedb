const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export default function robots() {
    return {
        rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/watchlists"] },
        sitemap: `${BASE}/sitemap.xml`,
    };
}
