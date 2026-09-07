import MovieCard from "@/components/MovieCard";
import MovieGridSkeleton from "@/components/MovieGridSkeleton";
import { getPopularMovies } from "@/services/movieApi";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface MovieObject {
    title: string;
    release_date: string;
    posterPath: string;
    overview: string;
    tmdbID: number;
}

const Home = () => {
    const [movies, setMovies] = useState<MovieObject[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    useEffect(() => {
        document.title = "Home";
        const fetchMovies = async () => {
            const moviesData = await getPopularMovies();
            setMovies(moviesData);
        };
        fetchMovies();
    }, []);

    const filteredMovies = useMemo(() => {
        if (!searchQuery.trim()) return movies;
        return movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [movies, searchQuery]);

    return (
        <div className="min-h-screen relative w-full bg-black pt-24 sm:pt-28 px-4 sm:px-8 pb-12">
            <div
                className="sm:absolute top-0 sm:top-7 right-0 sm:right-5 z-10 group flex items-center h-10 sm:h-9
                bg-white/5 backdrop-blur-sm border border-white/10 rounded-full
                shadow-lg shadow-black/20 transition-all duration-300 ease-out
                w-full sm:w-40 md:w-52
                focus-within:sm:w-52 focus-within:md:w-64
                focus-within:bg-white/10 focus-within:border-[#ff7a59]/50
                hover:border-white/20 px-3"
            >
                <Search
                    className="text-zinc-400 shrink-0 transition-colors duration-300 group-focus-within:text-[#ff7a59]"
                    size={17}
                />
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="text"
                    placeholder="Search"
                    className="w-full ml-2 border-none outline-none bg-transparent text-zinc-100 text-sm
                    placeholder:text-zinc-500"
                />
            </div>
            {movies.length > 0 && searchQuery.trim().length === 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.tmdbID}
                            movieTitle={movie.title}
                            movieID={movie.tmdbID}
                            imgUrl={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        />
                    ))}
                </div>
            ) : filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                    {filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.tmdbID}
                            movieTitle={movie.title}
                            movieID={movie.tmdbID}
                            imgUrl={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                        />
                    ))}
                </div>
            ) : searchQuery.trim() ? (
                <p className="text-zinc-400 text-sm">
                    No movies found for "{searchQuery}"
                </p>
            ) : (
                <MovieGridSkeleton />
            )}
        </div>
    );
};

export default Home;
