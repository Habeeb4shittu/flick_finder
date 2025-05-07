const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTllNjNjMzE1MjlhMGI0NTk3ZWI0NjY2N2IxYmFlMCIsIm5iZiI6MS43MDE2OTAyMzc5MzUwMDAyZSs5LCJzdWIiOiI2NTZkYmI3ZDY1MTdkNjAxNTE2NjQxMTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6XmLppCKCMZpeN6cwOl4KM7iq4RBo9P6CQ0C7FDFqX8",
  },
};
export const getNowPlayingMoviesApi = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching now playing movies:", err);
      return null;
    });
};
export const getPopularMoviesApi = (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const getUpcomingMoviesApi = async (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const getTopRatedMoviesApi = async (page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
export const searchMovies = async (query: string, page = 1) => {
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=${page}`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMovie = async (movieId: any) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMovieCast = async (movieId: any) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
