import express from "express";
import apiRouter from "#routers/api.js";
import authRouter from "./auth.mjs";
const rootRouter = express.Router();

rootRouter.use("/api", apiRouter);
rootRouter.use("/auth", authRouter);
export default rootRouter;