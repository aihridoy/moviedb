import test from "node:test";
import assert from "node:assert/strict";
import { signToken, verifyToken } from "../lib/token.mjs";

const SECRET = "test-secret";

test("valid token round-trips to its payload", () => {
    const token = signToken("user123", SECRET);
    assert.equal(verifyToken(token, SECRET), "user123");
});

test("tampered payload is rejected", () => {
    const token = signToken("user123", SECRET);
    const forged = "attacker" + token.slice(token.lastIndexOf("."));
    assert.equal(verifyToken(forged, SECRET), null);
});

test("wrong secret is rejected", () => {
    const token = signToken("user123", SECRET);
    assert.equal(verifyToken(token, "other-secret"), null);
});

test("garbage input is rejected, not thrown", () => {
    assert.equal(verifyToken("", SECRET), null);
    assert.equal(verifyToken("no-dot", SECRET), null);
    assert.equal(verifyToken(null, SECRET), null);
});
