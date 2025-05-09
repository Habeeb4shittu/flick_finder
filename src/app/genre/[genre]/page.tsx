"use client";

import { useEffect, useState, useRef, use } from "react";
import MovieCard from "@/components/MovieCard";
import { getAllGenres, getMovieGenres } from "@/network/apis";

type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
};

type Genre = {
    id: number;
    name: string;
};

export default function GenrePage({ params }: { params: Promise<{ genre: number }> }) {
    const { genre } = use(params);

    const [movies, setMovies] = useState<Movie[]>([]);
    const [genreName, setGenreName] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const fetchedPages = useRef<Set<number>>(new Set());

    // Fetch genre name once
    useEffect(() => {
        async function fetchGenreName() {
            try {
                const res = await getAllGenres();

                const found: Genre | undefined = res.genres.find(
                    (g: Genre) => g.id === Number(genre)
                );
                if (found) setGenreName(found.name);
                else setGenreName("Unknown Genre");
            } catch (error) {
                console.error("Error fetching genre name:", error);
                setGenreName("Error Loading Genre");
            }
        }

        fetchGenreName();
    }, [genre]);

    const fetchMovies = async (page: number) => {
        if (isFetching || page > totalPages || fetchedPages.current.has(page)) return;

        setIsFetching(true);
        fetchedPages.current.add(page);

        try {
            const data = await getMovieGenres(genre, page); // Make sure this accepts page
            setMovies((prev) => [...prev, ...data.results]);
            setTotalPages(data.total_pages);
            setCurrentPage(page);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        } finally {
            setIsFetching(false);
        }
    };

    // Initial load
    useEffect(() => {
        fetchMovies(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [genre]);

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
        <div className="flex flex-col w-full h-full px-4 md:px-24">
            <div className="flex items-center justify-between w-full py-1 px-8">
                <h4 className="text-[1.3rem] font-bold text-left my-2 text-shadow-cyan-900 font-sans cursor-pointer">
                    {genreName} Movies
                </h4>
            </div>

            <div className="flex flex-wrap justify-center items-center py-3">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {isFetching && (
                <p className="text-center text-sm text-gray-300 my-4">
                    Loading more movies...
                </p>
            )}
        </div>
    );
}
