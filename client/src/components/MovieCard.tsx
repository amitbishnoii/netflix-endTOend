const MovieCard = ({
    movieTitle,
    movieInfo,
    imgUrl,
}: {
    movieTitle: string;
    movieInfo: string;
    imgUrl: string;
}) => {
    return (
        <div
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 
                        aspect-2/3 transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
        >
            <img
                src={imgUrl}
                alt={movieTitle}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
            <div
                className="hidden group-hover:flex absolute inset-0 items-center justify-center text-center
                bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0.85)_100%)]
                backdrop-blur-[1px] transition-opacity duration-300"
            >
                <button
                    className="text-white text-xs sm:text-sm font-medium tracking-wide uppercase
                     border border-white/20 rounded-full px-4 py-1.5
                     bg-white/5 backdrop-blur-sm"
                >
                    Click to watch
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2">
                    {movieTitle}
                </h3>

                <p
                    className="text-zinc-300 text-xs mt-1 line-clamp-3 max-h-0 opacity-0 
                              group-hover:max-h-20 group-hover:opacity-100 
                              transition-all duration-300 ease-out"
                >
                    {movieInfo}
                </p>
            </div>

            <div
                className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent 
                            group-hover:ring-violet-400/40 transition-all duration-300"
            />
        </div>
    );
};

export default MovieCard;
