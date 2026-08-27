import { useState } from "react";
import type { MovieCast } from "./MovieDetails";
import { ChevronDown } from "lucide-react";

const Cast = ({ movieCast }: { movieCast: MovieCast[] }) => {
    const [visibleCount, setVisibleCount] = useState(10);

    const handleVisible = () => {
        if (visibleCount + 5 > movieCast.length) {
            setVisibleCount((prev) => prev + (movieCast.length - visibleCount));
        } else {
            setVisibleCount((prev) => prev + 5);
        }
    };

    return (
        <div className="max-h-162.5 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {movieCast.slice(0, visibleCount).map((cast) => {
                    const imageUrl = cast.profile_path
                        ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                        : null;

                    return (
                        <div
                            key={cast.original_name + cast.character}
                            className="flex flex-col gap-2"
                        >
                            <div className="aspect-2/3 rounded-lg overflow-hidden bg-zinc-800">
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={cast.original_name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-0.5">
                                <p className="text-white text-sm font-medium truncate">
                                    {cast.original_name}
                                </p>
                                <p className="text-zinc-500 text-xs truncate">
                                    {cast.character}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <button
                className={`${
                    movieCast.length === visibleCount ? "hidden" : "flex"
                } items-center justify-center gap-1.5 mx-auto mt-2 px-5 py-2.5 rounded-full 
       bg-zinc-800/60 border border-white/10 text-zinc-300 text-sm font-medium
       hover:bg-zinc-800 hover:border-white/20 hover:text-white
       active:scale-95 transition-all duration-200 mb-1`}
                onClick={handleVisible}
            >
                Show More
                <ChevronDown className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Cast;
