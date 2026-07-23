import { NextResponse } from "next/server";
import { getTopRated } from "@/lib/tmdb";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1;
    try {
        return NextResponse.json(await getTopRated(page));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch top rated movies" }, { status: error.status || 500 });
    }
}
