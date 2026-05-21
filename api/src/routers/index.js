import express from "express";
import apiRouter from "#routers/api.js";

const rootRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: General
 *   description: General routes
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Redirect to API documentation
 *     tags: [General]
 *     responses:
 *       302:
 *         description: Redirects to /docs
 */
rootRouter.get("/", (req, res) => {
  res.redirect("/docs");
});

rootRouter.use("/api", apiRouter);

export default rootRouter;