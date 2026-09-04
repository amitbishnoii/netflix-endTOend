import { useAuth } from "@/hooks/useAuth";
import { addMovie, fetchMovieFromTMDB } from "@/services/adminApi";
import { useState } from "react";

const AddPage = () => {
    const [tmdbID, setTmdbID] = useState<number>();
    const [movieData, setMovieData] = useState<Record<
        string,
        unknown | null
    > | null>(null);
    const [streamUrlHD, setStreamUrlHD] = useState<string>();
    const [streamUrlSD, setStreamUrlSD] = useState<string>();
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleFetch = async () => {
        if (typeof tmdbID === "undefined") {
            return;
        }
        if (!user) {
            return;
        }
        setLoading(true);
        const data = await fetchMovieFromTMDB(user.accessToken, tmdbID);
        setLoading(false);
        setMovieData(data);
    };

    const handleAdd = async () => {
        if (!user) {
            return;
        }
        setLoading(true);
        const status = await addMovie(user.accessToken, {
            ...movieData,
            streamUrlHD,
            streamUrlSD,
        });
        setLoading(false);
        if (status) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    };

    return (
        <div className="max-w-md space-y-4">
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="TMDB ID"
                    value={tmdbID}
                    onChange={(e) => setTmdbID(Number(e.target.value))}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors"
                />
                <button
                    disabled={loading}
                    onClick={handleFetch}
                    className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-sm font-medium text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                >
                    {loading ? "Getting..." : "Get Movie"}
                </button>
            </div>

            {movieData && (
                <div className="border border-white/10 rounded-xl p-4 space-y-3">
                    <input
                        type="text"
                        placeholder="720p URL"
                        value={streamUrlHD}
                        onChange={(e) => setStreamUrlHD(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors"
                    />
                    <input
                        type="text"
                        placeholder="480p URL"
                        value={streamUrlSD}
                        onChange={(e) => setStreamUrlSD(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white outline-none focus:border-white/30 transition-colors"
                    />
                    <button
                        disabled={loading}
                        onClick={handleAdd}
                        className="w-full px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    >
                        {loading ? "Adding..." : "Add Movie"}
                    </button>

                    {status && (
                        <p className="text-sm text-emerald-400 font-medium">
                            Movie Added!
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AddPage;
