import bcrypt from "bcrypt";
import db from "../configs/database.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const [newUser] = await db("app_user")
      .insert({
        name,
        email,
        password_hash,
        role: "user",
      })
      .returning(["id", "name", "email", "role"]);

    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Signup failed" });
  }
};

export const login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await db("app_user").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

export const getMe = async (req, res) => {
  try {
    // req.user was populated by the authenticateToken middleware
    const user = await db("app_user")
      .where({ id: req.user.id })
      .first();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Security: Remove the password hash before sending
    const { password_hash, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve user profile" });
  }
};