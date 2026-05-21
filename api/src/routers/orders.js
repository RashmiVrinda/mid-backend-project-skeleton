import express from "express";
import { getOrders, getOrderById } from "../controllers/orders.js";
import { authenticateToken, isAdmin } from "../middlewares/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Orders management API
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 *       401:
 *         description: Access denied. No token provided.
 *       403:
 *         description: Access denied. Admin privileges required.
 */
router.get("/", authenticateToken, isAdmin, getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Access denied. No token provided.
 *       404:
 *         description: Order not found
 */
router.get("/:id", authenticateToken, getOrderById);

export default router;