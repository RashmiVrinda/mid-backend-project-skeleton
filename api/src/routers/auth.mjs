import express from "express";
import { signup, login, getMe } from "../controllers/auth.js"; // Added getMe here
import { authenticateToken } from "../middlewares/index.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// This route uses the middleware to protect the getMe controller
router.get("/me", authenticateToken, getMe);

export default router;