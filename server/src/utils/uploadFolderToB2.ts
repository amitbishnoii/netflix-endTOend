import { readdirSync } from "fs";
import path from "path";
import uploadToB2 from "./uploadToB2.js";

const uploadFolder = async (localFolderPath: string, bucketPrefix: string) => {
    const files = readdirSync(localFolderPath);
    for (let fileName of files) {
        let localFilePath = path.join(localFolderPath, fileName);
        let key = `${bucketPrefix}/${fileName}`;
        let contentType = fileName.endsWith(".m3u8")
            ? "application/vnd.apple.mpegurl"
            : "video/mp2t";
        await uploadToB2(localFilePath, key, contentType);
    }
    console.log("files uploaded");
};

uploadFolder("./public/mutiny/720p/", "movies/mutiny/720p").catch((err) =>
    console.log(err),
);
