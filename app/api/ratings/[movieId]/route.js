import { Rating } from "@/models/rating-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

// The current user's own rating for a movie (for prefilling the form).
export async function GET(req, { params }) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ rating: null }), { status: 200 });
        }

        await dbConnect();
        const rating = await Rating.findOne({ userId, movieId: params.movieId }).lean();
        return new Response(JSON.stringify({ rating }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error fetching user rating:", error.message);
        return new Response(JSON.stringify({ rating: null }), { status: 200 });
    }
}
