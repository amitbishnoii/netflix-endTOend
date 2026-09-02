import getErrorMessage from "@/utils/errorMessage";
import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:3000/api/users",
});

export const addFavourite = async (
    movieID: number,
    username: string,
    accessToken: string,
) => {
    try {
        const favourite = await userApi.post(
            `/${username}/add-favourite`,
            {
                tmdbID: movieID,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } },
        );

        return favourite.data.success;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const removeFavourite = async (
    movieID: number,
    username: string,
    accessToken: string,
) => {
    try {
        const removed = await userApi.delete(`/${username}/remove-favourite`, {
            data: { tmdbID: movieID },
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log(removed.data.success);
        return removed.data.success;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

export const getFavourites = async (username: string, accessToken: string) => {
    try {
        const favouriteMovies = await userApi.get(`/favourites/${username}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return favouriteMovies.data.favourites;
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};
