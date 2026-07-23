import wait from "@/utils/wait";
import { NextResponse } from "next/server";
import { getSimilar } from "@/lib/tmdb";

export async function GET(req, { params }) {
    try {
        const data = await getSimilar(params.id);
        await wait(2000); // ponytail: intentional delay to showcase the loading spinner
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        return NextResponse.json({ error: "Failed to fetch similar movies" }, { status: error.status || 500 });
    }
}
