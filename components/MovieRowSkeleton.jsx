// Skeleton placeholder for a horizontal movie row while data loads.
const MovieRowSkeleton = ({ title }) => (
    <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="flex space-x-4 overflow-hidden pb-4">
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-48">
                    <div className="w-full h-72 rounded-lg bg-zinc-800 animate-pulse" />
                    <div className="h-4 mt-2 w-3/4 rounded bg-zinc-800 animate-pulse" />
                </div>
            ))}
        </div>
    </section>
);

export default MovieRowSkeleton;
