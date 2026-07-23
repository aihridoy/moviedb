import { NextResponse } from "next/server";
import { getPopular } from "@/lib/tmdb";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1;
    try {
        return NextResponse.json(await getPopular(page));
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch popular movies" }, { status: error.status || 500 });
    }
}
