import express from "express";
import {
  postCartItem,
  removeCartItem,
  postCheckout,
} from "../controllers/orders.js";
import { authenticateToken } from "../middlewares/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Cart management APIs
 */

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Item added
 *       401:
 *         description: Access denied. No token provided.
 */
router.post("/items", authenticateToken, postCartItem);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item removed
 *       401:
 *         description: Access denied. No token provided.
 */
router.delete("/items/:itemId", authenticateToken, removeCartItem);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Checkout completed successfully
 *       401:
 *         description: Access denied. No token provided.
 */
router.post("/checkout", authenticateToken, postCheckout);

export default router;