import express from "express";
import { 
    getOrders, 
    getOrderById, 
    postCheckout, 
    postCartItem, 
    removeCartItem 
} from "../controllers/orders.js"; 
import { authenticateToken } from "../middlewares/index.js"; 

const router = express.Router();

router.use(authenticateToken);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Successfully retrieved orders
 */
router.get("/", getOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /api/cart/items:
 *   post:
 *     summary: Add item to cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Item added
 */
router.post("/items", postCartItem); 

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remove item from cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Item removed
 */
router.delete("/items/:itemId", removeCartItem);

/**
 * @swagger
 * /api/cart/checkout:
 *   post:
 *     summary: Checkout the cart
 *     tags: [Cart]
 *     responses:
 *       201:
 *         description: Checkout completed successfully
 */
router.post("/checkout", postCheckout);

export default router;