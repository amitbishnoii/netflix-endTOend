import MovieCard from "@/components/MovieCard";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import { getPopularMovies } from "@/services/movieApi";
import { useEffect, useState } from "react";

interface MovieObject {
    title: string;
    release_date: string;
    poster_path: string;
    overview: string;
    id: number;
}

const Home = () => {
    const [movies, setMovies] = useState<MovieObject[]>([]);
    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await getPopularMovies();
            setMovies(moviesData);
        };
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen w-full bg-black pt-24 sm:pt-28 px-4 sm:px-8 pb-12">
            {movies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movieTitle={movie.title}
                            movieID={movie.id}
                            imgUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                    ))}
                </div>
            ) : (
                <MovieGridSkeleton />
            )}
        </div>
    );
};

export default Home;
