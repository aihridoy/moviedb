import { NextResponse } from "next/server";
import { discoverMovies } from "@/lib/tmdb";

// Random popular-ish movie, optionally filtered by genre.
export async function GET(req) {
    const genre = new URL(req.url).searchParams.get("genre");
    const page = Math.floor(Math.random() * 10) + 1; // spread across top pages for variety

    try {
        const params = { sort_by: "popularity.desc", "vote_count.gte": 100, page };
        if (genre) params.with_genres = genre;

        const data = await discoverMovies(params);
        const results = data.results || [];
        if (results.length === 0) {
            return NextResponse.json({ error: "No movies found" }, { status: 404 });
        }

        const movie = results[Math.floor(Math.random() * results.length)];
        return NextResponse.json({ movie });
    } catch (error) {
        return NextResponse.json({ error: "Failed to pick a movie" }, { status: error.status || 500 });
    }
}
