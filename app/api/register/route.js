import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();

        const newUser = await User.create(body);

        return new Response(
            JSON.stringify({ success: true, user: newUser }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        if (error.code === 11000) {
            return new Response(
                JSON.stringify({ message: "Email is already registered." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        console.error("🔥 API Error:", error.message);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
