import { dbConnect } from "@/services/mongo";
import { Watchlist } from "@/models/watchlist-model";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        await dbConnect();
        const watchlists = await Watchlist.find({}).lean();
        return new Response(JSON.stringify(watchlists), {
            status: 200,
        });
    } catch (err) {
        console.error("Error fetching watchlists:", err);
        return new Response(JSON.stringify({ error: "Failed to fetch watchlists" }), {
            status: 500,
        });
    }
}
