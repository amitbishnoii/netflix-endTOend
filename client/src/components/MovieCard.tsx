import { useNavigate } from "react-router-dom";

const MovieCard = ({
    movieTitle,
    imgUrl,
    movieID,
}: {
    movieTitle: string;
    imgUrl: string;
    movieID: number;
}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/movie/${movieID}`);
    };

    return (
        <div
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 
                        aspect-2/3 transition-transform duration-300 hover:-translate-y-1"
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
                backdrop-blur-[1px] transition-opacity duration-300 z-20"
            >
                <button
                    type="button"
                    className="text-white text-xs sm:text-sm font-medium tracking-wide uppercase
                   border border-white/20 rounded-full px-4 py-1.5
                   bg-white/5 backdrop-blur-sm cursor-pointer
                   hover:bg-white/15 hover:border-violet-400/50
                   active:scale-95 transition-all duration-200"
                    onClick={handleClick}
                >
                    Click to watch
                </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm font-semibold leading-tight line-clamp-2">
                    {movieTitle}
                </h3>
            </div>

            <div
                className="absolute inset-0 rounded-xl ring-1 ring-inset ring-transparent 
                            group-hover:ring-violet-400/40 transition-all duration-300"
            />
        </div>
    );
};

export default MovieCard;
