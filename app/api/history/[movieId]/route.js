import { History } from "@/models/history-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

export async function DELETE(req, { params }) {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        await dbConnect();
        await History.deleteOne({ userId, movieId: params.movieId });
        return new Response(JSON.stringify({ message: "Removed from history." }), { status: 200 });
    } catch (error) {
        console.error("🔥 Error removing from history:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}
