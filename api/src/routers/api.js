import express from "express";
import eventsRouter from "#routers/events.js";
import ordersRouter from "./orders.js"; 
import cartRouter from "./cart.js";     // Import new cart file
import authRouter from "./auth.mjs";     

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/carts", cartRouter);    // Mounts cart router to /api/carts

export default apiRouter;