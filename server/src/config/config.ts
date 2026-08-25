import dotenv from "dotenv";
dotenv.config();

interface Config {
    port: number;
    mongodbUri: string;
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    VITE_TMDB_API_KEY: string;
}

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`missing required environment var for key: ${key}`);
    }
    return value;
};

const config: Config = {
    port: Number(getEnvVar("PORT")),
    mongodbUri: getEnvVar("MONGODB_URI"),
    jwtAccessSecret: getEnvVar("JWT_ACCESS_SECRET"),
    jwtRefreshSecret: getEnvVar("JWT_REFRESH_SECRET"),
    VITE_TMDB_API_KEY: getEnvVar("VITE_TMDB_API_KEY"),
};

export default config;
