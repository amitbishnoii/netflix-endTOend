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
    const { user } = useAuth();

    const handleFetch = async () => {
        if (typeof tmdbID === "undefined") {
            return;
        }
        if (!user) {
            return;
        }
        const data = await fetchMovieFromTMDB(user.accessToken, tmdbID);
        setMovieData(data);
    };

    const handleAdd = async () => {
        if (!user) {
            return;
        }
        const status = await addMovie(user.accessToken, {
            ...movieData,
            streamUrlHD,
            streamUrlSD,
        });
    };

    return (
        <div>
            <div>
                <input
                    type="number"
                    placeholder="ID"
                    value={tmdbID}
                    onChange={(e) => setTmdbID(Number(e.target.value))}
                />
                <button onClick={handleFetch}>Get Movie</button>
            </div>

            {movieData && (
                <div>
                    <input
                        type="text"
                        placeholder="720p URL"
                        value={streamUrlHD}
                        onChange={(e) => setStreamUrlHD(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="480p URL"
                        value={streamUrlSD}
                        onChange={(e) => setStreamUrlSD(e.target.value)}
                    />
                    <button onClick={handleAdd}>Add Movie to DB</button>
                </div>
            )}
        </div>
    );
};

export default AddPage;
