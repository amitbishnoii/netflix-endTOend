import { useAuth } from "@/hooks/useAuth";
import { deleteMovie } from "@/services/adminApi";
import { useState } from "react";

const DeletePage = () => {
    const [movieID, setMovieID] = useState<number>();
    const [status, setStatus] = useState<string>();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const handleDelete = async () => {
        if (!user) return;
        if (!movieID) return;
        try {
            setLoading(true);
            await deleteMovie(movieID, user.accessToken);
            setLoading(false);
            setStatus("Deleted successfully");
        } catch (error) {
            if (error instanceof Error) setStatus(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-3 p-5 max-w-xs bg-[#1a1d23] border border-[#2e333d] rounded-xl shadow-lg shadow-black/40 font-sans">
            <input
                type="text"
                placeholder="Movie ID"
                value={movieID}
                onChange={(e) => setMovieID(Number(e.target.value))}
                className="px-3 py-2.5 bg-[#0f1115] border border-[#333844] rounded-md text-gray-200 text-sm outline-none focus:border-gray-500 transition-colors"
            />
            <button
                disabled={loading}
                onClick={handleDelete}
                className="px-3 py-2.5 rounded-md text-white font-semibold text-sm transition-colors bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? "Deleting..." : "Delete Movie"}
            </button>
            {status && (
                <p className="m-0 text-[13px] text-gray-400 font-mono">
                    {status}
                </p>
            )}
        </div>
    );
};

export default DeletePage;
