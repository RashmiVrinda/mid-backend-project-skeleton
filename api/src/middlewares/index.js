import jwt from 'jsonwebtoken';
import {
    apiErrorHandler,
    apiNotFoundHandler,
} from "#middlewares/errors.js";

/**
 * Middlewares that should run for every request before route handlers.
 *
 * Examples:
 * - logging
 * - request parsing helpers
 * - optional auth extraction that does not reject public requests
 *
 * Route protection middleware such as requireAuth should usually be attached
 * on specific routers or routes, not here.
 */
export const globalMiddlewares = [];

/**
 * Route protection middleware.
 * Attach this to specific routes in your routers.
 */
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  // We use the callback version of verify to check for specific error names
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: "Your session has expired. Please log in again." });
      }
      return res.status(403).json({ error: "Invalid token. Access denied." });
    }
    
    // Attach the verified user payload to the request
    req.user = user;
    next();
  });
};

/**
 * Middlewares that should run after routes.
 *
 * These are used for fallback and error handling after Express has tried
 * to match the request against the registered routes.
 */
export const terminalMiddlewares = [
    apiNotFoundHandler,
    apiErrorHandler,
];