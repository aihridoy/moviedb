import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/tmdb";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1;
    try {
        return NextResponse.json(await getNowPlaying(page));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch now playing movies" }, { status: error.status || 500 });
    }
}
