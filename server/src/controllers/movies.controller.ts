import Movie from "../models/Movie.js";
import type { IMovie } from "../models/Movie.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import type { Request, Response, NextFunction } from "express";
import {
    fetchPopularMovies,
    fetchDetails,
    fetchReviews,
} from "../services/tmdb.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import config from "../config/config.js";
import B2Client from "../utils/B2Client.js";

export const getPopularMovies = async (req: Request, res: Response) => {
    try {
        const data = await fetchPopularMovies();
        if (data.success === false) {
            res.status(500).send({
                success: false,
                message: data.message,
            });
            return;
        }
        res.status(200).send({ success: true, movies: data });
    } catch (error) {
        const err = error as Error;
        res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};

export const getDetails = async (req: Request, res: Response) => {
    try {
        const movieID = req.params.id;
        if (!movieID) {
            res.status(401).send({
                success: false,
                message: "MovieID is required.",
            });
            return;
        }
        const data = await fetchDetails(Number(movieID));
        if (data.success === false) {
            res.status(500).send({
                success: false,
                message: data.message,
            });
            return;
        }
        res.status(200).send({ success: true, data });
    } catch (error) {
        const err = error as Error;
        res.status(500).send({
            success: false,
            message: err.message,
            cause: err.cause,
        });
    }
};

export const getReviews = async (req: Request, res: Response) => {
    try {
        const movieID = req.params.id;
        if (!movieID) {
            res.status(401).send({
                success: false,
                message: "MovieID is required.",
            });
            return;
        }
        const data = await fetchReviews(Number(movieID));
        console.log("controller ran at line 73");
        if (data.success === false) {
            console.log(
                "error found in data reteurned from service function at line 75 in controller",
            );
            res.status(500).send({
                success: false,
                message: data.message,
            });
            return;
        }
        res.status(200).send({ success: true, data: data.data });
    } catch (error) {
        const err = error as Error;
        res.status(500).send({
            success: false,
            message: err.message,
            cause: err.cause,
        });
    }
};

export const streamFile = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { fileName, quality } = req.params;

        const key = `movies/mutiny/${quality}/${fileName}`;

        const response = await B2Client.send(
            new GetObjectCommand({
                Bucket: config.B2_BUCKET_NAME,
                Key: key,
            }),
        );

        res.setHeader(
            "Content-Type",
            response.ContentType || "application/octet-stream",
        );
        (response.Body as NodeJS.ReadableStream).pipe(res);
    } catch (error) {
        console.log("error: ", error);
        next(error);
    }
};

export const getMaster = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const key = "movies/mutiny/master.m3u8";
        const response = await B2Client.send(
            new GetObjectCommand({
                Bucket: config.B2_BUCKET_NAME,
                Key: key,
            }),
        );
        res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
        (response.Body as NodeJS.ReadableStream).pipe(res);
    } catch (error) {
        next(error);
    }
};
