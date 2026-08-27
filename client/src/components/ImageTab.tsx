const ImageTab = ({
    file_path,
    width,
    height,
}: {
    file_path: string;
    width: number;
    height: number;
}) => {
    return (
        <div className={`w-[${width}] h-[${height}]`}>
            <img
                src={"https://image.tmdb.org/t/p/original/" + file_path}
                alt=""
            />
        </div>
    );
};

export default ImageTab;
