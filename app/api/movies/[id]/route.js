import { NextResponse } from "next/server";
import { getMovie } from "@/lib/tmdb";

export async function GET(req, { params }) {
    try {
        return NextResponse.json(await getMovie(params.id));
    } catch (error) {
        return NextResponse.json({ error: "Movie not found" }, { status: error.status || 500 });
    }
}
