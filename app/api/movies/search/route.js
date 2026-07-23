import { NextResponse } from "next/server";
import { searchMovies, discoverMovies } from "@/lib/tmdb";

export async function GET(req) {
    const sp = new URL(req.url).searchParams;
    const query = sp.get("query");
    const page = sp.get("page") || 1;

    const genres = sp.get("genres");
    const yearMin = sp.get("yearMin");
    const yearMax = sp.get("yearMax");
    const ratingMin = sp.get("ratingMin");
    const language = sp.get("language");
    const runtimeMin = sp.get("runtimeMin");
    const runtimeMax = sp.get("runtimeMax");

    const hasFilters = genres || yearMin || yearMax || ratingMin || language || runtimeMin || runtimeMax;

    if (!query && !hasFilters) {
        return NextResponse.json({ error: "Query or filters required" }, { status: 400 });
    }

    try {
        // TMDB /search can't filter and /discover can't text-search, so filters
        // take the discover path (text query is ignored when filters are set).
        if (hasFilters) {
            const params = { sort_by: "popularity.desc", "vote_count.gte": 50, page };
            if (genres) params.with_genres = genres;
            if (yearMin) params["primary_release_date.gte"] = `${yearMin}-01-01`;
            if (yearMax) params["primary_release_date.lte"] = `${yearMax}-12-31`;
            if (ratingMin) params["vote_average.gte"] = ratingMin;
            if (language) params.with_original_language = language;
            if (runtimeMin) params["with_runtime.gte"] = runtimeMin;
            if (runtimeMax) params["with_runtime.lte"] = runtimeMax;
            return NextResponse.json(await discoverMovies(params));
        }

        return NextResponse.json(await searchMovies(query, page));
    } catch (error) {
        console.error("Error fetching movie search results:", error);
        return NextResponse.json({ error: "Failed to fetch movie search results" }, { status: error.status || 500 });
    }
}
