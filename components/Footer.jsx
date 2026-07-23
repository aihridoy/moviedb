import Link from "next/link";

const Footer = () => (
    <footer className="border-t border-zinc-800 mt-8">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
                <span className="text-red-600 font-bold text-lg">MOVIE DB</span>
                <span className="ml-2">© {new Date().getFullYear()}</span>
            </div>
            <nav className="flex flex-wrap gap-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <Link href="/random" className="hover:text-white">Random</Link>
                <Link href="/calendar" className="hover:text-white">Calendar</Link>
                <Link href="/compare-movies" className="hover:text-white">Compare</Link>
            </nav>
            <p>
                Movie data by{" "}
                <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
                    TMDB
                </a>
            </p>
        </div>
    </footer>
);

export default Footer;
