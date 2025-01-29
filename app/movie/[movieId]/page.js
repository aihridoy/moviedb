import AddWatchListButton from "@/components/AddWatchListButton";
import Header from "@/components/Header";
import SocialShare from "@/components/SocialShare";
import dynamic from "next/dynamic";
import Image from "next/image";

const SimilarMovies = dynamic(() => import('@/components/SimilarMovies'), { suspense: true, ssr: false });

export async function generateMetadata({ params, searchParams }, parent) {
    const { movieId } = params;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}`, {
            next: { revalidate: 10 },
        });

        if (!res.ok) throw new Error("Failed to fetch movie metadata");

        const movie = await res.json();

        return {
            title: movie?.title?.slice(0, 50),
            description: movie?.overview?.slice(0, 100),
            openGraph: {
                images: `https://image.tmdb.org/t/p/original${movie?.poster_path}`,
            },
        };
    } catch (error) {
        console.error("Metadata fetch error:", error);
        return {
            title: "Movie Not Found",
            description: "The requested movie could not be found.",
        };
    }
}

export default async function MovieDetails({ params }) {
    const { movieId } = params;

    let movie, casts;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}`, {
            next: { revalidate: 10 },
        });

        if (!res.ok) throw new Error("Failed to fetch movie details");

        movie = await res.json();
    } catch (error) {
        console.error("Movie fetch error:", error);
        return (
            <div className="flex justify-center items-center h-screen text-center">
                <h1 className="text-2xl font-bold text-red-500">Movie not found!</h1>
            </div>
        );
    }

    try {
        const castRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/movies/${movieId}/credits`, {
            next: { revalidate: 10 },
        });

        if (!castRes.ok) throw new Error("Failed to fetch casts");

        casts = await castRes.json();
    } catch (error) {
        console.error("Casts fetch error:", error);
        casts = { cast: [] };
    }

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(movie.release_date));

    const currentUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/movie/${movieId}`;

    return (
        <>
            <Header />
            <div id="movieDetails" className="min-h-screen pt-20 mb-8">
                <div className="relative h-screen">
                    <div className="absolute inset-0">
                        <Image
                            fill
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title || "Movie Poster"}
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black via-black/70"
                        ></div>
                    </div>

                    <div className="relative container mx-auto px-4 pt-32">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/3 relative">
                                <Image
                                    fill
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title || "Movie Poster"}
                                    className="w-full rounded-lg shadow-lg object-cover"
                                />
                            </div>

                            <div className="md:w-2/3">
                                <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                                <div className="flex items-center mb-4 space-x-4">
                                    <span className="text-green-500"> {formattedDate} </span>
                                    <span>| </span>
                                    <span>{movie.runtime} min</span>
                                </div>

                                <p className="text-lg mb-6">
                                    {movie.overview}
                                </p>

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Genres</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {
                                            movie.genres.map(genre => (
                                                <span key={genre.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                                                    {genre.name} </span
                                                >
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Cast</h3>
                                    <div className="flex overflow-x-auto space-x-4">
                                        {casts?.cast.map((cast) => (
                                            <div key={cast.id} className="flex-shrink-0 text-center">
                                                <Image
                                                    width={200}
                                                    height={300}
                                                    src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                                                    alt={cast.name}
                                                    className="w-24 h-24 rounded-full object-cover mb-2"
                                                />
                                                <p className="text-sm">{cast.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-4">
                                        <div className="text-center">
                                            <AddWatchListButton movie={movie} />
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-gray-400 mb-2">Share on social media</h3>
                                    <SocialShare movie={movie} currentUrl={currentUrl} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SimilarMovies movieId={movieId} />
        </>
    );
}
