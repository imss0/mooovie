import { API_KEY } from "@env";

const getNowPlaying = async () => {
  return await (
    await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-us&page=1`
    )
  ).json();
};

const getUpComing = async () => {
  return await (
    await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-us&page=1`
    )
  ).json();
};

const getTrending = async () => {
  return await (
    await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    )
  ).json();
};

export { getNowPlaying, getUpComing, getTrending };
