import crypto from "crypto";

// Signed session token: "<payload>.<hmac>". No dependency, no JWT lib needed.
export function signToken(payload, secret) {
    const p = String(payload);
    const sig = crypto.createHmac("sha256", secret).update(p).digest("hex");
    return `${p}.${sig}`;
}

export function verifyToken(token, secret) {
    if (!token || typeof token !== "string" || !token.includes(".")) return null;
    const idx = token.lastIndexOf(".");
    const payload = token.slice(0, idx);
    const sig = token.slice(idx + 1);
    const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
    return payload;
}
