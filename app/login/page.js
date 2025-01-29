"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../actions";

export default function LoginPage() {
    const { setAuth } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleLogin(event) {
        event.preventDefault();
        setLoading(true)
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            setError("Email and password are required!");
            return;
        }

        try {
            const user = await loginUser({ email, password });
            if (user) {
                setAuth(user);
                router.push("/");
            } else {
                setError("Invalid login credentials.");
            }
        } catch (err) {
            console.error("Login error:", err.message);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-white text-3xl font-bold mb-4">Sign In</h1>

                    {error && (
                        <div className="text-red-500 bg-red-100 p-2 rounded mb-4">
                            <p>{error}</p>
                        </div>
                    )}

                    <form className="space-y-4" onSubmit={handleLogin}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email or phone number"
                            className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
                            required
                        />
                        <button
                            type="submit"
                            className={`w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300 ${loading ? "cursor-not-allowed opacity-70" : ""
                                }`}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg
                                        className="animate-spin h-5 w-5 text-white mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>

                    </form>

                    <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="hover:underline">Need help?</a>
                    </div>

                    <div className="mt-6 text-moviedb-gray">
                        New to moviedb?{" "}
                        <Link href="/register" className="text-white hover:underline">
                            Sign up now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
