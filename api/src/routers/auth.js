import express from "express";
import { signup, login, getMe } from "../controllers/auth.js";
import { authenticateToken } from "../middlewares/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Email already registered or invalid inputs
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and return JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", login);

 /**
  * @swagger
  * /api/auth/me:
  *   get:
  *     summary: Get current logged-in user
  *     tags: [Auth]
  *     security:
  *       - bearerAuth: []
  *     responses:
  *       200:
  *         description: Success
  *       401:
  *         description: Access denied. No token provided.
  *       404:
  *         description: User not found
  */
router.get("/me", authenticateToken, getMe);


export default router;