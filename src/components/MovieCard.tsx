type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
};

export default function MovieCard({ movie, loading = false }: { movie: Movie; loading?: boolean }) {
    if (loading) {
        return (
            <div className="p-2">
                <div className="w-44 h-60 bg-zinc-800 rounded-md mb-2 animate-pulse" />
                <div className="w-44 h-5 bg-zinc-800 rounded mb-1 animate-pulse" />
                <div className="w-20 h-3 bg-zinc-800 rounded animate-pulse" />
            </div>
        );
    }

    return (
        <div key={movie.id} className="p-2 group cursor-pointer">
            <div className="w-44 shrink-0 group-hover:transform group-hover:-translate-y-2 transition duration-300">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-60 object-cover rounded-md"
                />
            </div>
            <h3 className="text-sm font-semibold text-white group-hover:text-amber-500 transition max-w-44 duration-300 mt-2 wrap-normal mb-1">
                {movie.title}
            </h3>
            <p className="text-xs text-gray-400 font-light">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                })}
            </p>
        </div>
    );
}
