import { Watchlist } from "@/models/watchlist-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

// CSV field escaping: wrap in quotes, double any internal quotes.
const cell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

export async function GET() {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ message: "Unauthorized." }), { status: 401 });
        }

        await dbConnect();
        const items = await Watchlist.find({ userId }).sort({ addedAt: -1 }).lean();

        const header = ["Title", "MovieId", "AddedAt"];
        const rows = items.map((m) => [m.title, m.movieId, new Date(m.addedAt).toISOString()]);
        const csv = [header, ...rows].map((r) => r.map(cell).join(",")).join("\n");

        return new Response(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": 'attachment; filename="watchlist.csv"',
            },
        });
    } catch (error) {
        console.error("🔥 Error exporting watchlist:", error.message);
        return new Response(JSON.stringify({ message: "Internal server error." }), { status: 500 });
    }
}
