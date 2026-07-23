import { NextResponse } from "next/server";
import { getCredits } from "@/lib/tmdb";

export async function GET(req, { params }) {
    try {
        return NextResponse.json(await getCredits(params.id));
    } catch (error) {
        console.error("Error fetching credits:", error);
        return NextResponse.json({ error: "Failed to fetch credits" }, { status: error.status || 500 });
    }
}
