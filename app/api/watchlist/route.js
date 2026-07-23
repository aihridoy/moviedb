import { Watchlist } from "@/models/watchlist-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export async function POST(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { movieId, title, posterPath } = await req.json();
        if (!movieId || !title || !posterPath) {
            return new Response(
                JSON.stringify({ message: "All fields are required." }),
                { status: 400 }
            );
        }

        await dbConnect();

        const existingMovie = await Watchlist.findOne({ userId, movieId });
        if (existingMovie) {
            return new Response(
                JSON.stringify({ message: "Movie already in Watchlist." }),
                { status: 409 }
            );
        }

        const newMovie = await Watchlist.create({ userId, movieId, title, posterPath });
        return new Response(
            JSON.stringify({
                message: "Movie added to Watchlist successfully.",
                data: newMovie,
            }),
            { status: 201 }
        );
    } catch (error) {
        console.error("🔥 Error adding to Watchlist:", error.message);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const movieId = searchParams.get("movieId");

        await dbConnect();

        if (movieId) {
            const movie = await Watchlist.findOne({ userId, movieId });
            return new Response(
                JSON.stringify({ isInWatchlist: !!movie }),
                { status: 200 }
            );
        }

        const watchlist = await Watchlist.find({ userId }).lean();
        return new Response(JSON.stringify({ watchlist }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error fetching Watchlist:", error.message);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500 }
        );
    }
}
