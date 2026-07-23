import { NextResponse } from "next/server";
import { discoverMovies } from "@/lib/tmdb";

const pad = (n) => String(n).padStart(2, "0");

// Movies releasing in a given year/month.
export async function GET(req) {
    const sp = new URL(req.url).searchParams;
    const now = new Date();
    const year = parseInt(sp.get("year"), 10) || now.getFullYear();
    const month = parseInt(sp.get("month"), 10) || now.getMonth() + 1;

    const firstDay = `${year}-${pad(month)}-01`;
    const lastDate = new Date(year, month, 0).getDate();
    const lastDay = `${year}-${pad(month)}-${pad(lastDate)}`;

    try {
        const data = await discoverMovies({
            "primary_release_date.gte": firstDay,
            "primary_release_date.lte": lastDay,
            sort_by: "primary_release_date.asc",
            "vote_count.gte": 5,
            page: 1,
        });
        return NextResponse.json({ results: data.results || [] });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch calendar" }, { status: error.status || 500 });
    }
}
