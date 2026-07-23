"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { useSearch } from "@/app/contexts/SearchContext";
import { useFavorites } from "@/app/contexts/FavoritesContext";
import { logoutUser } from "@/app/actions";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/compare-movies", label: "Compare Movies" },
    { href: "/history", label: "History" },
    { href: "/favorites", label: "Favorites", badge: true },
    { href: "/random", label: "Random" },
    { href: "/calendar", label: "Calendar" },
];

const Header = () => {
    const { auth, setAuth } = useAuth();
    const { fetchSearchResults } = useSearch();
    const { count: favoritesCount } = useFavorites();
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isLoggedIn = !!auth?.firstName;

    // Close the drawer on navigation and lock body scroll while it's open.
    useEffect(() => setOpen(false), [pathname]);
    useEffect(() => {
        if (open) {
            // Compensate the vanishing scrollbar so the page doesn't jump.
            const sbw = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
        } else {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
        };
    }, [open]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        fetchSearchResults(input);
        router.push(`/search-results?query=${encodeURIComponent(input)}`);
        setOpen(false);
    };

    const handleLogout = async () => {
        await logoutUser();
        setAuth(null);
        router.push("/");
    };

    const goWatchLater = () => router.push(isLoggedIn ? "/watchlists" : "/login");

    return (
        <>
            <nav className="fixed w-full z-50 bg-gradient-to-b from-black/90 to-transparent">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
                    <Link href="/" className="text-red-600 text-2xl md:text-3xl font-bold whitespace-nowrap">
                        MOVIE DB
                    </Link>

                    <div className="flex items-center gap-3">
                        <form onSubmit={handleSearch}>
                            <input
                                type="text"
                                placeholder="Search movies..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-36 sm:w-48 lg:w-64 bg-black/50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
                            />
                        </form>

                        <button
                            onClick={() => setOpen(true)}
                            aria-label="Open menu"
                            className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-white/10 transition"
                        >
                            <span className="sr-only">Menu</span>
                            <div className="w-6 flex flex-col gap-1.5">
                                <span className="block h-0.5 bg-white rounded" />
                                <span className="block h-0.5 bg-white rounded" />
                                <span className="block h-0.5 bg-white rounded" />
                            </div>
                            {isLoggedIn && favoritesCount > 0 && (
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Backdrop */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-[650ms] ease-out ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            />

            {/* Slide-in drawer */}
            <aside
                className={`fixed top-0 right-0 z-[70] h-full w-72 max-w-[85%] bg-zinc-900 shadow-2xl will-change-transform transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                    <span className="text-red-600 text-xl font-bold">MOVIE DB</span>
                    <button onClick={() => setOpen(false)} aria-label="Close menu" className="w-9 h-9 flex items-center justify-center rounded hover:bg-white/10 text-2xl leading-none">
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2 pt-4">
                    {LINKS.map((l, i) => {
                        const active = pathname === l.href;
                        return (
                            <Link
                                key={l.href}
                                href={l.href}
                                style={{ transitionDelay: open ? `${180 + i * 65}ms` : "0ms" }}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition duration-[600ms] ease-out ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} ${active ? "bg-red-600/20 text-red-500 font-semibold" : "text-white hover:bg-white/5"}`}
                            >
                                <span>{l.label}</span>
                                {l.badge && isLoggedIn && favoritesCount > 0 && (
                                    <span className="bg-red-600 text-white text-xs rounded-full px-2 py-0.5 leading-none">{favoritesCount}</span>
                                )}
                            </Link>
                        );
                    })}
                    <button
                        onClick={goWatchLater}
                        className={`w-full text-left px-4 py-3 rounded-lg transition duration-[600ms] ease-out ${open ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"} ${pathname === "/watchlists" ? "bg-red-600/20 text-red-500 font-semibold" : "text-white hover:bg-white/5"}`}
                        style={{ transitionDelay: open ? `${180 + LINKS.length * 65}ms` : "0ms" }}
                    >
                        Watch Later
                    </button>
                </div>

                <div className="p-4 border-t border-zinc-800">
                    {isLoggedIn ? (
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm truncate"><span className="font-bold">Welcome,</span> {auth.firstName}</span>
                            <button onClick={handleLogout} className="bg-zinc-800 px-3 py-1.5 rounded border border-gray-600 hover:border-white text-sm">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link href="/login" className="block text-center bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                            Login
                        </Link>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Header;
