import axios from "axios";

const userApi = axios.create({
    baseURL: "http://localhost:3000/api/users",
});

export const addFavourite = async (
    movieID: number,
    username: string,
    accessToken: string,
) => {
    const favourite = await userApi.post(
        `/${username}/add-favourite`,
        {
            tmdbID: movieID,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } },
    );

    return favourite.data.success;
};

export const getFavourites = async (username: string, accessToken: string) => {
    const favouriteMovies = await userApi.get(`/favourites/${username}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });
    return favouriteMovies.data.favourites;
};
