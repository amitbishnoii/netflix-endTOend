import { createReadStream } from "fs";
import B2Client from "./B2Client.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/config.js";

const uploadToB2 = async (
    localFilePath: string,
    bucketKey: string,
    contentType: string,
) => {
    const fileBuffer = createReadStream(localFilePath);
    console.log("reading buffer: ", fileBuffer);

    console.log("uploading files");
    await B2Client.send(
        new PutObjectCommand({
            Bucket: config.B2_BUCKET_NAME,
            Key: bucketKey,
            Body: fileBuffer,
            ContentType: contentType,
        }),
    );

    return `Uploaded to: ${bucketKey}`;
};

export default uploadToB2;
