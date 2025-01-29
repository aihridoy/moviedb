import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );

    if (!res.ok) {
        return NextResponse.json({ error: "Movie not found" }, { status: 404 });
    }

    const data = await res.json();
    return NextResponse.json(data);
}
