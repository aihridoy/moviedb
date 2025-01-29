import wait from "@/utils/wait";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "Failed to fetch similar movies" },
                { status: res.status }
            );
        }

        await wait(2000)
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
