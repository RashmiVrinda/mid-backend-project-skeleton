import express from "express";
import eventsRouter from "#routers/events.js";
import ordersRouter from "./orders.js"; 
import authRouter from "./auth.mjs";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/cart", ordersRouter); // This maps your cart endpoints correctly!

export default apiRouter;