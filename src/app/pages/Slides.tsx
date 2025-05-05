import Slider from "@/components/Slider";
import { useEffect, useState } from "react";

export default function Slides() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [isFetchingNowPlaying, setIsFetchingNowPlaying] = useState(true);
    const [isFetchingPopular, setIsFetchingPopular] = useState(true);
    const [isFetchingUpcoming, setIsFetchingUpcoming] = useState(true);
    const [isFetchingTopRated, setIsFetchingTopRated] = useState(true);

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllNjNjMzE1MjlhMGI0NTk3ZWI0NjY2N2IxYmFlMCIsIm5iZiI6MS43MDE2OTAyMzc5MzUwMDAyZSs5LCJzdWIiOiI2NTZkYmI3ZDY1MTdkNjAxNTE2NjQxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6XmLppCKCMZpeN6cwOl4KM7iq4RBo9P6CQ0C7FDFqX8",
        },
    };
    const getNowPlayingMovies = async () => {
        setIsFetchingNowPlaying(true);
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
            const data = await res.json();
            setNowPlaying(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingNowPlaying(false);
        }
    };

    const getPopularMovies = async () => {
        setIsFetchingPopular(true);
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", options);
            const data = await res.json();
            setPopularMovies(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingPopular(false);
        }
    };

    const getUpcomingMovies = async () => {
        setIsFetchingUpcoming(true);
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", options);
            const data = await res.json();
            setUpcomingMovies(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingUpcoming(false);
        }
    };

    const getTopRatedMovies = async () => {
        setIsFetchingTopRated(true);
        try {
            const res = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options);
            const data = await res.json();
            setTopRated(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetchingTopRated(false);
        }
    };

    useEffect(() => {
        getNowPlayingMovies();
        getPopularMovies();
        getUpcomingMovies();
        getTopRatedMovies();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section className="flex flex-col gap-8 px-12 md:px-28 py-4">
            <Slider head="Now Playing" movies={nowPlaying} fullPageLink="now-playing" isFetching={isFetchingNowPlaying} />
            <Slider head="Upcoming Movies" movies={upcomingMovies} fullPageLink="upcoming" isFetching={isFetchingUpcoming} />
            <Slider head="Top Rated" movies={topRated} fullPageLink="top-rated" isFetching={isFetchingTopRated} />
            <Slider head="Popular Now" movies={popularMovies} fullPageLink="popular-now" isFetching={isFetchingPopular} />
        </section>
    );

}
