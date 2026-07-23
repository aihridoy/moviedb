import { cookies } from "next/headers";
import { signToken, verifyToken } from "./token.mjs";

const COOKIE = "session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
    const s = process.env.SESSION_SECRET;
    if (!s) throw new Error("SESSION_SECRET is not set");
    return s;
}

// Returns the authenticated userId from the signed cookie, or null.
export function getUserId() {
    return verifyToken(cookies().get(COOKIE)?.value, secret());
}

export function setSession(userId) {
    cookies().set(COOKIE, signToken(userId, secret()), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export function clearSession() {
    cookies().delete(COOKIE);
}
