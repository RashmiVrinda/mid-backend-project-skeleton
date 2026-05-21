import express from "express";
import { getOrders, getOrderById } from "../controllers/orders.js"; 
import { authenticateToken } from "../middlewares/index.js"; 

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/orders:
 * get:
 * summary: Get all orders
 * tags: [Orders]
 * responses:
 * 200:
 * description: Successfully retrieved orders
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 * get:
 * summary: Get order details by ID
 * tags: [Orders]
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * responses:
 * 200:
 * description: Success
 */
router.get("/:id", getOrderById);

export default router;