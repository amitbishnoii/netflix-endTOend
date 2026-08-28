import { useParams } from "react-router-dom";

const StreamPage = () => {
    const { movieID } = useParams();
    return <div>StreamPage, {movieID}</div>;
};

export default StreamPage;
