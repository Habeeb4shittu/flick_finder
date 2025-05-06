"use client";
import searchIcon from "@/components/icons/search-alt-2-svgrepo-com.svg"
import Image from "next/image";
import { useRouter } from "next/navigation";
import AnimateOnScroll from "./AnimateOnScroll";
import { slideInLeft } from "@/lib/animations";
import { useEffect, useState } from "react";
import { searchMovies } from "@/network/apis";

export default function Header() {
    const navigate = useRouter();
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]); // Adjust the type as needed
    const handleSearch = async (query: string) => {
        const searchData = await searchMovies(query);
        setSearchResults(searchData.results);
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.length > 0) {
                handleSearch(search);
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timeoutId); // Cleanup the timeout on unmount or when search changes
    }, [search])

    const handleFullSearch = () => {
        if (search.length > 0) {
            navigate.push(`/search/${search}`);
        }
        setShowSearch(false);
    }

    return (
        <header className="flex gap-1 md:gap-12 items-center justify-between w-full px-12 flex-wrap md:flex-nowrap md:px-24 mt-2 py-2">
            <AnimateOnScroll animation={slideInLeft} delay={0.2}>
                <h1 className="text-3xl font-bold text-left my-2 text-shadow-cyan-900 font-sans cursor-pointer" onClick={() => {
                    navigate.push("/")
                }}>
                    Flick<span className="text-amber-500 italic">Finder</span>
                </h1>
            </AnimateOnScroll>
            <div className="relative flex flex-col items-center justify-center w-full">
                <div className="flex items-center bg-[#1b1b1b] px-4 py-2.5 rounded-md mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Search movies..."
                        className="flex-1 mr-3 bg-transparent font-sans text-white placeholder:text-[#a9a8b1] border-none outline-none"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                        onKeyDown={(event => {
                            if (event.key === "Enter") {
                                handleFullSearch();
                            }
                        })}
                    />
                    <Image src={searchIcon} alt="Search" width={28} height={28} className="text-white opacity-70 cursor-pointer" onClick={handleFullSearch} />
                </div>
                {showSearch && (
                    <div className="absolute top-12 left-0 w-full bg-[#1b1b1b] rounded-md shadow-lg p-4 z-10 max-h-[70vh] overflow-y-auto thin-scrollbar">
                        <h2 className="text-white text-lg font-semibold ml-3 mt-2">Search Results</h2>
                        <div>
                            {searchResults.length > 0 ? (
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                searchResults.map((movie: any) => (
                                    <div key={movie.id} className="mb-0.5 py-3.5 border-b flex gap-2 justify-start items-center border-[#ffffff33] px-3 cursor-pointer" onClick={() => {
                                        navigate.push(`/movie/${movie.id}`)
                                    }}>
                                        {movie.poster_path ? (


                                            <Image
                                                src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                                                alt={movie.title}
                                                width={45}
                                                height={45}
                                                className="rounded-md"
                                            />
                                        ) : (
                                            <svg
                                                width="45px"
                                                height="45px"
                                                viewBox="0 0 1024 1024"
                                                className="icon"
                                                version="1.1"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="#000000">
                                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path d="M861.9 383.8H218.1c-36.4 0-66.1-29.8-66.1-66.1V288c0-36.4 29.8-66.1 66.1-66.1h643.8c36.4 0 66.1 29.8 66.1 66.1v29.7c0 36.3-29.8 66.1-66.1 66.1z" fill="#FFB89A"></path>
                                                    <path d="M822.9 129.2H199.8c-77.2 0-140.4 63.2-140.4 140.4v487.2c0 77.2 63.2 140.4 140.4 140.4h623.1c77.2 0 140.4-63.2 140.4-140.4V269.6c0-77.2-63.2-140.4-140.4-140.4z m80.4 177H760.4L864.6 201c5.4 3.3 10.4 7.3 15 11.8 15.3 15.3 23.7 35.4 23.7 56.8v36.6z m-673.3 0l104-117h61.3l-109.1 117H230z m247.4-117h169.2L532 306.2H368.3l109.1-117z m248.8 0h65.6L676 306.2h-60l112.5-114.8-2.3-2.2zM143 212.9c15.3-15.3 35.4-23.7 56.8-23.7h53.9l-104 117h-30.4v-36.5c0.1-21.4 8.5-41.5 23.7-56.8z m736.6 600.7c-15.3 15.3-35.4 23.7-56.8 23.7h-623c-21.3 0-41.5-8.4-56.8-23.7-15.3-15.3-23.7-35.4-23.7-56.8V366.2h783.9v390.6c0.1 21.3-8.3 41.5-23.6 56.8z" fill="#45484C"></path>
                                                    <path d="M400.5 770.6V430.9L534.1 508c14.3 8.3 19.3 26.6 11 41-8.3 14.3-26.6 19.3-41 11l-43.6-25.2v131.8l114.1-65.9-7.5-4.3c-14.3-8.3-19.3-26.6-11-41 8.3-14.3 26.6-19.3 41-11l97.5 56.3-294.1 169.9z" fill="#33CC99"></path>
                                                </g>
                                            </svg>
                                        )}
                                        <div>
                                            <h3
                                                dangerouslySetInnerHTML={{
                                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
                                                    __html: movie.title.replace(new RegExp(search, "gi"), (match: any) => `<span class="text-amber-500">${match}</span>`),
                                                }}
                                                className="text-white font-medium" />

                                            <p className="text-gray-400 text-sm">
                                                {new Date(movie.release_date).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">No results found</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>

    )
}