import express from "express";
import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent,
  removeEvent,
} from "#controllers/events.js";
import { authenticateToken, isAdmin } from "../middlewares/index.js";

const eventsRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Events management API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: Tech Conference 2026
 *         description:
 *           type: string
 *           example: Annual technology conference
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-06-15T10:00:00Z
 *         location:
 *           type: string
 *           example: Copenhagen
 *
 *     EventInput:
 *       type: object
 *       required:
 *         - title
 *         - date
 *       properties:
 *         title:
 *           type: string
 *           example: Tech Conference 2026
 *         description:
 *           type: string
 *           example: Annual technology conference
 *         date:
 *           type: string
 *           format: date-time
 *           example: 2026-06-15T10:00:00Z
 *         location:
 *           type: string
 *           example: Copenhagen
 */

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get paginated list of events
 *     description: Returns a paginated list of events with optional search.
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search by title or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *         required: false
 *         description: Page number (zero-based)
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 20
 *         required: false
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
eventsRouter.get("/", getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *       404:
 *         description: Event not found
 */
eventsRouter.get("/:id", getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
eventsRouter.post("/", authenticateToken, isAdmin, postEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update an existing event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
eventsRouter.patch("/:id", authenticateToken, isAdmin, patchEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
eventsRouter.delete("/:id", authenticateToken, isAdmin, removeEvent);

export default eventsRouter;