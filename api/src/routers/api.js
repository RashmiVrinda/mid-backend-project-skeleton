import express from "express";
import eventsRouter from "#routers/events.js";
import ordersRouter from "./orders.js"; 
import authRouter from "./auth.js";
import cartRouter from "./cart.js"; // Import your new cart file

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/events", eventsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/cart", cartRouter); // Route the cart endpoints to cartRouter

export default apiRouter;