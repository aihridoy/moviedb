import { History } from "@/models/history-model";
import { Rating } from "@/models/rating-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

// Mark a movie as watched (upsert; re-watch bumps watchedAt).
export async function POST(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { movieId, title, posterPath, genres } = await req.json();
        if (!movieId || !title) {
            return new Response(
                JSON.stringify({ message: "movieId and title are required." }),
                { status: 400 }
            );
        }

        await dbConnect();
        const doc = await History.findOneAndUpdate(
            { userId, movieId: String(movieId) },
            { title, posterPath: posterPath || "", genres: genres || [], watchedAt: new Date() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return new Response(JSON.stringify({ history: doc }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error adding to history:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}

// Paginated watch history + aggregate stats for the current user.
export async function GET(req) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

        await dbConnect();

        const total = await History.countDocuments({ userId });
        const history = await History.find({ userId })
            .sort({ watchedAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        // Stats over the full history, not just this page.
        const all = await History.find({ userId }).select("genres").lean();
        const genreCounts = {};
        for (const h of all) {
            for (const g of h.genres || []) genreCounts[g] = (genreCounts[g] || 0) + 1;
        }
        const topGenres = Object.entries(genreCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({ name, count }));

        const userRatings = await Rating.find({ userId }).select("rating").lean();
        const averageRating = userRatings.length
            ? Number((userRatings.reduce((s, r) => s + r.rating, 0) / userRatings.length).toFixed(1))
            : 0;

        return new Response(
            JSON.stringify({
                history,
                total,
                page,
                pages: Math.ceil(total / limit),
                stats: { totalWatched: total, topGenres, averageRating },
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("🔥 Error fetching history:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}
