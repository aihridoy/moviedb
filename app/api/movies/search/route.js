import { NextResponse } from "next/server";
import { searchMovies } from "@/lib/tmdb";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const page = searchParams.get("page") || 1;

    if (!query) {
        return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
    }

    try {
        return NextResponse.json(await searchMovies(query, page));
    } catch (error) {
        console.error("Error fetching movie search results:", error);
        return NextResponse.json({ error: "Failed to fetch movie search results" }, { status: error.status || 500 });
    }
}
