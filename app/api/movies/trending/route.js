import { NextResponse } from "next/server";

export async function GET() {
    const url = `${process.env.TMDB_BASE_URL}/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
}
