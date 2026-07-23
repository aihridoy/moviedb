import { Watchlist } from "@/models/watchlist-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export async function GET() {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }

        await dbConnect();
        const watchlists = await Watchlist.find({ userId }).lean();
        return new Response(JSON.stringify(watchlists), { status: 200 });
    } catch (err) {
        console.error("Error fetching watchlists:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch watchlists" }), {
            status: 500,
        });
    }
}
