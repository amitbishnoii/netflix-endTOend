const MovieCardSkeleton = () => {
    return (
        <div className="relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 aspect-2/3 animate-pulse">
            <div className="w-full h-full bg-zinc-800" />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="h-2.5 bg-zinc-700 rounded w-3/4 mb-1.5" />
                <div className="h-2.5 bg-zinc-700 rounded w-1/2" />
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
