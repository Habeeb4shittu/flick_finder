import Slider from "@/components/Slider";
import { useEffect, useState } from "react";

export default function Slides() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllNjNjMzE1MjlhMGI0NTk3ZWI0NjY2N2IxYmFlMCIsIm5iZiI6MS43MDE2OTAyMzc5MzUwMDAyZSs5LCJzdWIiOiI2NTZkYmI3ZDY1MTdkNjAxNTE2NjQxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6XmLppCKCMZpeN6cwOl4KM7iq4RBo9P6CQ0C7FDFqX8",
        },
    };
    const getNowPlayingMovies = async () => {
        await fetch(
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
            options
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res.results);
                setNowPlaying(res.results);
            })
            .catch((err) => console.error(err));
    };
    const getPopularMovies = async () => {
        await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                console.log(res.results)
                setPopularMovies(res.results)
            })
            .catch(err => console.error(err));
    }
    const getUpcomingMovies = async () => {
        await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                console.log(res.results)
                setUpcomingMovies(res.results)
            })
            .catch(err => console.error(err));
    }
    const getTopRatedMovies = async () => {
        await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
            .then(res => res.json())
            .then(res => {
                console.log(res.results)
                setTopRated(res.results)
            })
            .catch(err => console.error(err));
    }
    useEffect(() => {
        getNowPlayingMovies();
        getPopularMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    return (
        <>
            <Slider head="Now Playing" movies={nowPlaying} />
            <Slider head="Upcoming Movies" movies={upcomingMovies} />
            <Slider head="Top Rated" movies={topRated} />
            <Slider head="Popular Now" movies={popularMovies} />
        </>
    )
}
