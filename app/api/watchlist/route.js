import { Watchlist } from "@/models/watchlist-model";
import { dbConnect } from "@/services/mongo";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, movieId, title, posterPath } = body;

        if (!userId || !movieId || !title || !posterPath) {
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
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const movieId = searchParams.get("movieId");

        if (!userId) {
            return new Response(
                JSON.stringify({ message: "User ID is required." }),
                { status: 400 }
            );
        }

        await dbConnect();

        if (movieId) {
            const movie = await Watchlist.findOne({ userId, movieId });
            return new Response(
                JSON.stringify({ isInWatchlist: !!movie }),
                { status: 200 }
            );
        } else {
            const watchlist = await Watchlist.find({ userId }).lean();
            return new Response(JSON.stringify({ watchlist }), { status: 200 });
        }
    } catch (error) {
        console.error("🔥 Error fetching Watchlist:", error.message);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500 }
        );
    }
}
