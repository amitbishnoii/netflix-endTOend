import axios from "axios";

const adminApi = axios.create({
    baseURL: "http://localhost:3000/api/admin",
});

export const fetchMovieFromTMDB = async (
    accessToken: string,
    tmdbID: number,
) => {
    const response = await adminApi.get(`/movie/${tmdbID}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.info.data;
};

export const addMovie = async (accessToken: string, data: any) => {
    console.log("got request to create a movie with this data: ", data);
    const response = await adminApi.post(
        "/add-movie",
        { movie: data },
        {
            headers: { Authorization: `Bearer ${accessToken}` },
        },
    );
    if (response.data.success) {
        return true;
    } else {
        return false;
    }
};
