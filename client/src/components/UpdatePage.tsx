import { useAuth } from "@/hooks/useAuth";
import { updateMovie } from "@/services/adminApi";
import { useState } from "react";

const UpdatePage = () => {
    const [movieID, setMovieID] = useState<number>();
    const [title, setTitle] = useState<string>("");
    const [streamUrlHD, setStreamUrlHD] = useState<string>("");
    const [streamUrlSD, setStreamUrlSD] = useState<string>("");
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
        await updateMovie(movieID, user.accessToken, updates);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Movie ID"
                value={movieID}
                onChange={(e) => setMovieID(Number(e.target.value))}
            />
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Stream URL (720p)"
                value={streamUrlHD}
                onChange={(e) => setStreamUrlHD(e.target.value)}
            />
            <input
                type="text"
                placeholder="Stream URL (480p)"
                value={streamUrlSD}
                onChange={(e) => setStreamUrlSD(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default UpdatePage;
