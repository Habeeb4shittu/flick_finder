"use client";
import MovieDetailSkeleton from "@/components/MovieDetailSkeleton";
import { getMovie, getMovieCast } from "@/network/apis";
import Link from "next/link";
import { useEffect, useState, use } from "react";



type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    vote_average: number;
    popularity: number;
    vote_count: number;
    original_language: string;
    runtime: number;
    revenue: number;
    genres: { id: number; name: string }[];
};

type Cast = {
    id: number;
    name: string;
    character: string;
    profile_path: string;
};

export default function MoviePage({ params }: { params: Promise<{ movie: string }> }) {
    const { movie } = use(params); // ✅ unwrap params
    const [thisMovie, setThisMovie] = useState<Movie>();
    const [cast, setCast] = useState<Cast[]>([]);
    const [loading, setLoading] = useState(true);
    const [reformedCast, setReformedCast] = useState<Cast[]>([]);
    const [seeAllCast, setSeeAllCast] = useState(false);


    const getThisMovie = async () => {
        setLoading(true);
        try {
            const data = await getMovie(movie);
            const castData = await getMovieCast(movie);
            setThisMovie(data);
            setCast(castData.cast);
            setReformedCast(castData.cast.slice(0, 9));
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch searched movies:", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        getThisMovie();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (seeAllCast) {
            setReformedCast(cast);
        } else {
            setReformedCast(cast.slice(0, 9));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seeAllCast]);

    if (loading) {
        return <MovieDetailSkeleton />
    } else {
        return (
            <div className="flex flex-col w-full h-full px-12 md:px-24 mt-5">
                <div className="flex flex-col lg:flex-row items-start justify-center w-full h-full">
                    <div className="w-full lg:w-[90%] xl:w-[45%] flex flex-col items-start justify-center gap-4">
                        <img
                            src={thisMovie?.poster_path ? `https://image.tmdb.org/t/p/w500${thisMovie?.poster_path}`
                                : "/images/placeholder.jpeg"}
                            alt={thisMovie?.title}
                            className="w-full object-cover min-h-[675px] rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full h-full mt-4 lg:mt-0 lg:px-9">
                        <h1 className="text-3xl font-extrabold text-white">{thisMovie?.title}</h1>
                        <p className="text-lg text-gray-400 font-light mt-3.5">
                            {new Date(thisMovie?.release_date ? thisMovie?.release_date : new Date()).toLocaleDateString("en-US", {
                                year: "numeric",
                            })}
                        </p>
                        <div className="flex items-center justify-start gap-4 mt-3.5 flex-wrap">
                            <p className="text-md font-semibold text-amber-500 flex items-center gap-1">
                                <svg
                                    fill="#f09818"
                                    width="22px"
                                    height="22px"
                                    viewBox="0 0 1024 1024"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 0 0 .6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0 0 46.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
                                    </g>
                                </svg>
                                {thisMovie?.vote_average.toFixed(1)}
                            </p>
                            <span className="w-[1px] h-4 bg-[#ffffff29]"></span>
                            <p className="text-md font-semibold text-gray-400 whitespace-nowrap">{(thisMovie?.runtime && thisMovie?.runtime / 60)?.toFixed() + "hr"} {" "} {(thisMovie?.runtime && thisMovie?.runtime % 60) + "min"}</p>
                            <span className="w-[1px] h-4 bg-[#ffffff29]"></span>
                            <p className="text-md font-semibold text-gray-400 whitespace-nowrap">
                                {thisMovie?.genres.map((genre, index) => (
                                    <Link
                                        key={genre.id}
                                        href={`/genre/${genre.id}`}
                                    >
                                        <span
                                            className="hover:underline hover:text-amber-500 cursor-pointer">
                                            {genre.name}
                                        </span>
                                        {index < thisMovie.genres.length - 1 && ", "}
                                    </Link>
                                ))}
                            </p>
                        </div>
                        <p className="text-base tracking-wider font-medium text-white mt-3.5">{thisMovie?.overview}</p>
                        <div className="mt-3.5">
                            <h3 className="text-2xl font-semibold text-white">Featured Cast</h3>
                            <div className="flex items-center justify-center lg:justify-start gap-4 max-h-[85vh] lg:max-h-[415px] py-1 overflow-y-auto flex-wrap mt-4 thin-scrollbar">
                                {reformedCast.map((actor) => (
                                    <div key={actor.id} className="flex flex-col items-start justify-center gap-2">
                                        <img
                                            src={actor?.profile_path ? `https://image.tmdb.org/t/p/w500${actor?.profile_path}` : "/images/user-placeholder.jpeg"}
                                            alt={actor?.name}
                                            className="w-28 lg:w-35 h-28 lg:h-35 object-cover rounded-md"
                                        />
                                        <div>
                                            <p className="text-base text-gray-100 font-semibold truncate max-w-28 lg:max-w-35">{actor?.character}</p>
                                            <p className="text-sm max-w-28 lg:max-w-35 font-medium text-gray-400 truncate">{actor?.name}</p>
                                        </div>
                                    </div>
                                ))}
                                {cast.length > 9 && (
                                    <button onClick={() => { setSeeAllCast(!seeAllCast) }} className="w-28 lg:w-35 cursor-pointer" title={seeAllCast ? "See less" : "See more"}>{seeAllCast ? (
                                        <svg
                                            fill="#f09818"
                                            viewBox="-9.5 0 32 32"
                                            width={70}
                                            height={70}
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M7.28 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.84 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.16 0.16-0.4 0.24-0.6 0.24zM12.040 23.28c-0.2 0-0.44-0.080-0.6-0.24l-6.44-6.44c-0.32-0.32-0.32-0.84 0-1.2l6.44-6.44c0.32-0.32 0.84-0.32 1.2 0 0.32 0.32 0.32 0.84 0 1.2l-5.88 5.84 5.84 5.84c0.32 0.32 0.32 0.84 0 1.2-0.12 0.16-0.36 0.24-0.56 0.24z"></path>
                                            </g>
                                        </svg>
                                    ) : (
                                        <svg
                                            fill="#f09818"
                                            viewBox="-9.5 0 32 32"
                                            version="1.1"
                                            width={70}
                                            height={70}
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path d="M5.6 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24zM0.84 23.28c-0.2 0-0.44-0.080-0.6-0.24-0.32-0.32-0.32-0.84 0-1.2l5.84-5.84-5.84-5.84c-0.32-0.32-0.32-0.84 0-1.2 0.32-0.32 0.84-0.32 1.2 0l6.44 6.44c0.16 0.16 0.24 0.36 0.24 0.6s-0.080 0.44-0.24 0.6l-6.44 6.44c-0.16 0.16-0.4 0.24-0.6 0.24z"></path>
                                            </g>
                                        </svg>
                                    )}</button>
                                )}
                            </div>
                        </div>
                        <div className="mt-3.5">
                            <h3 className="text-2xl font-semibold text-white">Additional Information</h3>
                            <div className="flex items-center justify-start gap-4">
                                <p className="text-lg text-gray-300 font-light mt-3.5">
                                    Release Date: {" "}
                                    {new Date(thisMovie?.release_date ? thisMovie?.release_date : new Date()).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>

                                <p className="text-lg text-gray-300 font-light mt-3.5">
                                    Revenue: {" "}
                                    {thisMovie?.revenue ? thisMovie?.revenue.toLocaleString("en-US", {
                                        style: "currency",
                                        currency: "USD",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 2,
                                    }) : "N/A"}
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
