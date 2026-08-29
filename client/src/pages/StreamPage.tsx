import Hls from "hls.js";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const StreamPage = () => {
    const { movieID } = useParams();

    const videoRef = useRef<HTMLVideoElement>(null);
    const streamURL = "http://localhost:3000/hls-test/720p.m3u8";
    const navigate = useNavigate();

    useEffect(() => {
        if (!videoRef.current) return;
        const hls = new Hls();

        hls.loadSource(streamURL);
        hls.attachMedia(videoRef.current);

        return () => {
            hls.destroy();
        };
    }, []);

    return (
        <div className="bg-black min-h-screen flex flex-col">
            <button
                onClick={() => navigate(-1)}
                className="text-white p-4 self-start cursor-pointer"
            >
                ← Back
            </button>

            <video ref={videoRef} controls className="w-full flex-1" />
        </div>
    );
};

export default StreamPage;
