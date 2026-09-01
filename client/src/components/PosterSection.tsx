import { useState } from "react";

const PosterSection = ({ posterUrl }: { posterUrl: string | undefined }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative w-150 h-187.5 rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
            {!loaded && (
                <div className="absolute inset-0 animate-pulse bg-zinc-800" />
            )}

            <img
                src={`https://image.tmdb.org/t/p/original/${posterUrl}`}
                alt="Movie poster"
                onLoad={() => setLoaded(true)}
                fetchPriority="high"
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                    loaded ? "opacity-100" : "opacity-0"
                }`}
            />

            <div className="absolute inset-0 shadow-[inset_0_0_80px_40px_rgba(0,0,0,0.4)]" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
        </div>
    );
};

export default PosterSection;