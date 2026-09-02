import { useAuth } from "@/hooks/useAuth";
import { getFavourites } from "@/services/userApi";
import { useEffect, useState } from "react";
import type { MovieDetailsObj } from "./MoviePage";
import MovieCard from "@/components/MovieCard";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";

const Favourites = () => {
    const { user } = useAuth();
    const [favouriteMovies, setFavouriteMovies] = useState<MovieDetailsObj[]>();

    useEffect(() => {
        if (!user) {
            return;
        }
        const fetchFavourites = async () => {
            const favourites = await getFavourites(
                user.username,
                user.accessToken,
            );
            setFavouriteMovies(favourites);
        };
        fetchFavourites();
    }, []);

    return (
        <div className="min-h-screen w-full bg-black pt-24 sm:pt-28 px-4 sm:px-8 pb-12">
            {favouriteMovies && favouriteMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {favouriteMovies.map((movie) => (
                        <MovieCard
                            key={movie.tmdbID}
                            movieTitle={movie.title}
                            movieID={movie.tmdbID}
                            imgUrl={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        />
                    ))}
                </div>
            ) : (
                <MovieGridSkeleton />
            )}
        </div>
    );
};

export default Favourites;
