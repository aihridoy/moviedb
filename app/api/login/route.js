import bcrypt from "bcrypt";
import { User } from "@/models/user-model";
import { dbConnect } from "@/services/mongo";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response(
                JSON.stringify({ message: "Email and password are required." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        await dbConnect();
        const user = await User.findOne({ email }).select("+password");

        const ok = user && (await bcrypt.compare(password, user.password));
        if (!ok) {
            return new Response(
                JSON.stringify({ message: "Invalid email or password." }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        // toJSON transform strips the password before it leaves the server.
        return new Response(
            JSON.stringify(user),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("🔥 Login Error:", error.message);
        return new Response(
            JSON.stringify({ message: "Internal server error." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
