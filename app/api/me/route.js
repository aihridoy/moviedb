import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";
import { getUserId } from "@/lib/session";

export const dynamic = "force-dynamic"; // reads cookies — never prerender

export async function GET() {
    try {
        const userId = getUserId();
        if (!userId) {
            return new Response(JSON.stringify({ user: null }), { status: 200 });
        }

        await dbConnect();
        const user = await User.findById(userId); // password is select:false + stripped by toJSON
        return new Response(JSON.stringify({ user }), { status: 200 });
    } catch (error) {
        console.error("🔥 /api/me Error:", error.message);
        return new Response(JSON.stringify({ user: null }), { status: 200 });
    }
}
