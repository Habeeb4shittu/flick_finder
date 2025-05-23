import { fadeInUp } from "@/lib/animations";
import AnimateOnScroll from "./AnimateOnScroll";
import { useRouter } from "next/navigation";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
};

export default function MovieCard({ movie, loading = false, search = "" }: { movie: Movie; loading?: boolean; search?: string }) {
    const navigate = useRouter();
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
        <AnimateOnScroll animation={fadeInUp} delay={0.2}>
            <div key={movie.id} className="p-2 group cursor-pointer" onClick={() => {
                navigate.push(`/movie/${movie.id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
                <div className="w-44 shrink-0 group-hover:transform group-hover:-translate-y-2 transition duration-300">
                    <img
                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/images/placeholder.jpeg"}
                        alt={movie.title}
                        className="w-full h-60 object-cover rounded-md"
                    />
                </div>
                {search ? (
                    <h3
                        dangerouslySetInnerHTML={{
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any 
                            __html: movie.title.replace(new RegExp(search, "gi"), (match: any) => `<span class="text-amber-500">${match}</span>`),
                        }}
                        className="text-sm font-semibold text-white group-hover:text-amber-500 transition max-w-44 duration-300 mt-2 wrap-normal mb-1" />
                ) : (
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-500 transition max-w-44 duration-300 mt-2 wrap-normal mb-1">
                        {movie.title}
                    </h3>
                )}
                <p className="text-xs text-gray-400 font-light">
                    {new Date(movie.release_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                    })}
                </p>
            </div>
        </AnimateOnScroll>
    );
}
