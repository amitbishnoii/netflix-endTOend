import { S3Client } from "@aws-sdk/client-s3";
import config from "../config/config.js";

const B2Client = new S3Client({
    region: "eu-central-003",
    endpoint: config.BACKBLAZE_ENDPOINT,
    credentials: {
        accessKeyId: config.B2_KEY_ID,
        secretAccessKey: config.B2_APPLICATON_KEY,
    }
})

export default B2Client;