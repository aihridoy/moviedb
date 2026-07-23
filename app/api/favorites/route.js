import { Favorite } from "@/models/favorite-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

// Toggle a movie in the user's favorites.
export async function POST(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { movieId, title, posterPath } = await req.json();
        if (!movieId || !title) {
            return new Response(
                JSON.stringify({ message: "movieId and title are required." }),
                { status: 400 }
            );
        }

        await dbConnect();
        const existing = await Favorite.findOne({ userId, movieId: String(movieId) });
        if (existing) {
            await existing.deleteOne();
            return new Response(JSON.stringify({ favorited: false }), { status: 200 });
        }

        await Favorite.create({ userId, movieId: String(movieId), title, posterPath: posterPath || "" });
        return new Response(JSON.stringify({ favorited: true }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error toggling favorite:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

// GET ?movieId= → { isFavorite }; otherwise the full favorites list.
export async function GET(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const movieId = new URL(req.url).searchParams.get("movieId");
        await dbConnect();

        if (movieId) {
            const fav = await Favorite.findOne({ userId, movieId });
            return new Response(JSON.stringify({ isFavorite: !!fav }), { status: 200 });
        }

        const favorites = await Favorite.find({ userId }).sort({ addedAt: -1 }).lean();
        return new Response(JSON.stringify({ favorites }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error fetching favorites:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}
