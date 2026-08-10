import express from 'express';
import { createProfile, getUser } from '../controllers/user.controller.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const userRouter = express.Router()

userRouter.get("/:username", getUser)
userRouter.post("/create", createProfile);

export default userRouter;