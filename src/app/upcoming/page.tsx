"use client";
import MovieCard from "@/components/MovieCard";
import { getUpcomingMoviesApi } from "@/network/apis";
import { useEffect, useState, useRef } from "react";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
};

export default function NowPlaying() {
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const fetchedPages = useRef<Set<number>>(new Set());

    const fetchMovies = async (page: number) => {
        if (isFetching || page > totalPages || fetchedPages.current.has(page)) return;

        setIsFetching(true);
        fetchedPages.current.add(page);

        try {
            const data = await getUpcomingMoviesApi(page);
            setUpcoming((prev) => [...prev, ...data.results]);
            setTotalPages(data.total_pages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Failed to fetch now playing movies:", error);
        } finally {
            setIsFetching(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchMovies(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 400;

            if (nearBottom && !isFetching && currentPage < totalPages) {
                fetchMovies(currentPage + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, totalPages, isFetching]);

    return (
        <div className="flex flex-col w-full h-full px-4 md:px-28">
            <div className="flex items-center justify-between w-full py-1">
                <h4 className="text-[1.3rem] font-bold text-left my-2 text-shadow-cyan-900 font-sans cursor-pointer">
                    Upcoming Movies
                </h4>
            </div>
            <div className="flex gap-4 flex-wrap justify-center items-center py-3">
                {upcoming.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>

            {isFetching && (
                <p className="text-center text-sm text-gray-300 my-4">Loading more movies...</p>
            )}
        </div>
    );
}
