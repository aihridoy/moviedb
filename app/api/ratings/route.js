import { Rating } from "@/models/rating-model";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

// Create or update the current user's rating/review for a movie.
export async function POST(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { movieId, rating, reviewText } = await req.json();
        if (!movieId || !rating) {
            return new Response(
                JSON.stringify({ message: "movieId and rating are required." }),
                { status: 400 }
            );
        }
        if (rating < 1 || rating > 10) {
            return new Response(
                JSON.stringify({ message: "Rating must be between 1 and 10." }),
                { status: 400 }
            );
        }

        await dbConnect();

        const user = await User.findById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found." }), { status: 401 });
        }

        const doc = await Rating.findOneAndUpdate(
            { userId, movieId: String(movieId) },
            { rating, reviewText: reviewText || "", userName: user.firstName },
            { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
        );

        return new Response(JSON.stringify({ rating: doc }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error saving rating:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

// Public: all ratings for a movie, newest first, plus average + count.
export async function GET(req) {
    try {
        const movieId = new URL(req.url).searchParams.get("movieId");
        if (!movieId) {
            return new Response(JSON.stringify({ message: "movieId is required." }), { status: 400 });
        }

        await dbConnect();
        const ratings = await Rating.find({ movieId }).sort({ createdAt: -1 }).lean();
        const count = ratings.length;
        const average = count
            ? Number((ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1))
            : 0;

        return new Response(JSON.stringify({ ratings, average, count }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error fetching ratings:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}
