import express from "express";
import eventsRouter from "#routers/events.js";
import ordersRouter from "./orders.js"; 

const apiRouter = express.Router();

apiRouter.use("/events", eventsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/cart", ordersRouter);
export default apiRouter;