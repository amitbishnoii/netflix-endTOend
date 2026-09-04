import { useAuth } from "@/hooks/useAuth";
import { updateMovie } from "@/services/adminApi";
import { useState } from "react";

const UpdatePage = () => {
    const [movieID, setMovieID] = useState<number>();
    const [title, setTitle] = useState<string>("");
    const [streamUrlHD, setStreamUrlHD] = useState<string>("");
    const [streamUrlSD, setStreamUrlSD] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<string>();
    const { user } = useAuth();

    const handleUpdate = async () => {
        if (!user) {
            return;
        }
        if (!movieID) {
            return;
        }
        const updates: Record<string, string> = {};
        if (title) updates.title = title;
        if (streamUrlHD) updates.streamUrlHD = streamUrlHD;
        if (streamUrlSD) updates.streamUrlSD = streamUrlSD;
        setLoading(true);
        const info = await updateMovie(movieID, user.accessToken, updates);
        setLoading(false);
        if (info) {
            setStatus("Movie Updated!");
        } else {
            setStatus("Updation Failed!");
        }
    };

    return (
        <div className="max-w-md p-6 rounded-2xl bg-[#0b0d12] border border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <h2 className="text-sm font-semibold tracking-wide text-gray-300 uppercase">
                    Edit Movie
                </h2>
            </div>

            <input
                type="text"
                placeholder="Movie ID"
                value={movieID}
                onChange={(e) => setMovieID(Number(e.target.value))}
                className="px-4 py-2.5 bg-white/3 border border-white/10 rounded-lg text-gray-100 text-sm outline-none focus:border-fuchsia-400/60 transition-colors"
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-4 py-2.5 bg-white/3 border border-white/10 rounded-lg text-gray-100 text-sm outline-none focus:border-fuchsia-400/60 transition-colors"
            />
            <input
                type="text"
                placeholder="Stream URL (720p)"
                value={streamUrlHD}
                onChange={(e) => setStreamUrlHD(e.target.value)}
                className="px-4 py-2.5 bg-white/3 border border-white/10 rounded-lg text-gray-100 text-sm outline-none focus:border-fuchsia-400/60 transition-colors"
            />
            <input
                type="text"
                placeholder="Stream URL (480p)"
                value={streamUrlSD}
                onChange={(e) => setStreamUrlSD(e.target.value)}
                className="px-4 py-2.5 bg-white/3 border border-white/10 rounded-lg text-gray-100 text-sm outline-none focus:border-fuchsia-400/60 transition-colors"
            />

            <button
                onClick={handleUpdate}
                disabled={loading}
                className="mt-1 px-4 py-2.5 rounded-lg font-semibold text-sm text-white bg-fuchsia-600 hover:bg-fuchsia-700 transition-colors"
            >
                {loading ? "Updating..." : "Update Movie"}
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default UpdatePage;
