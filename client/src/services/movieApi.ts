import axios from "axios";

const movieApi = axios.create({
    baseURL: "http://localhost:3000/api/movies",
});

export const getPopularMovies = async () => {
    const data = await movieApi.get("/popularMovies");
    return data;
}