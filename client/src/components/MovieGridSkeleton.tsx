// this is the actual file that is imported in home.tsx and favourite.tsx it imports moviegridskeleton.tsx and renders the skeletons

import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieGridSkeleton = ({ count = 10 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <MovieCardSkeleton key={i} />
            ))}
        </div>
    );
};

export default MovieGridSkeleton;
