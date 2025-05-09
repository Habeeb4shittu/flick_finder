"use client";
import ActorDetailSkeleton from "@/components/ActorDetailSkeleton";
import MovieCard from "@/components/MovieCard";
import { getActorCasts, getActorDetails } from "@/network/apis";
import { use, useEffect, useState } from "react";

type Actor = {
    id: number;
    name: string;
    profile_path: string;
    birthday: string;
    deathday: string | null;
    also_known_as: string[];
    place_of_birth: string;
    biography: string;
};
type Movie = {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
};
export default function ActorPage({ params }: { params: Promise<{ actor: number }> }) {
    const { actor } = use(params);
    const [thisActor, setThisActor] = useState<Actor>();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);



    const getThisActor = async () => {
        setLoading(true);
        try {
            const data = await getActorDetails(actor);
            const movieData = await getActorCasts(actor);
            setThisActor(data);
            setMovies(movieData?.cast);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch searched movies:", error);
            setLoading(false);
        }
    };


    useEffect(() => {
        getThisActor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (loading) {
        return <ActorDetailSkeleton />
    }
    return (
        <div>
            <div className="flex flex-col w-full h-full px-12 md:px-24 mt-5">
                <div className="flex flex-col lg:flex-row items-start justify-center w-full h-full">
                    <div className="w-full lg:w-[90%] xl:w-[45%] flex flex-col items-start justify-center gap-4">
                        <img
                            src={thisActor?.profile_path ? `https://image.tmdb.org/t/p/w500${thisActor?.profile_path}`
                                : "/images/placeholder.jpeg"}
                            alt={thisActor?.name}
                            className="w-full object-cover min-h-[475px] lg:max-h-[625px] rounded-md"
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start w-full h-full mt-4 py-8 lg:mt-0 lg:px-9">
                        <h1 className="text-4xl font-bold text-white">{thisActor?.name}</h1>
                        <p className="text-base text-gray-400 font-light mt-3.5">
                            <span className="text-base text-white font-medium">
                                Born: {" "}
                            </span>
                            {new Date(thisActor?.birthday ? thisActor?.birthday : new Date()).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "2-digit",
                            })}{" "}
                        </p>
                        {thisActor?.deathday && (
                            <p className="text-base text-gray-400 font-light">
                                <span className="text-base text-white font-medium">
                                    Died:{" "}
                                </span>
                                <span className="text-base text-gray-400 font-light">
                                    {thisActor?.deathday ? new Date(thisActor?.deathday).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "2-digit",
                                    }) : "N/A"}
                                </span>
                            </p>
                        )}
                        <p>
                            <span className="text-base text-white font-medium mt-3.5">
                                Place of Birth:{" "}
                            </span>
                            <span className="text-base text-gray-400 font-light mt-3.5">
                                {thisActor?.place_of_birth}
                            </span>
                        </p>
                        <p>
                            <span className="text-base text-white font-medium mt-3.5">
                                Also known as:{" "}
                            </span>
                            {thisActor?.also_known_as.map((name, index) => (
                                <span key={index} className="text-base text-gray-400 font-light mt-3.5">
                                    {name}
                                    {index < thisActor?.also_known_as.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                        <h3 className="text-2xl font-semibold text-white my-4">Biography</h3>
                        <div>
                            <p className="text-base inline tracking-wider font-medium text-gray-400">
                                {thisActor?.biography}
                            </p>
                        </div>
                    </div>
                </div>
                <h3 className="text-2xl font-semibold text-white my-4">Known For</h3>
                <div className="flex flex-wrap gap-4">
                    {movies?.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie} />
                    ))}
                </div>
            </div>
        </div >
    );
}