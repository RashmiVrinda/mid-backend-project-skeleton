import express from "express";
import {
  getEvents,
  getEventById,
  postEvent,
  patchEvent,
  removeEvent,
} from "#controllers/events.js";

const eventsRouter = express.Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get paginated list of events
 *     description: Returns a paginated list of events. Supports searching by title and description.
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search term for title or description
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
 *         description: Paginated list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 meta:
 *                   type: object
 */
eventsRouter.get("/", getEvents);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get event by ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
eventsRouter.get("/:id", getEventById);

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create event (optional/admin)
 *     tags:
 *       - Events
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Event created
 *       501:
 *         description: Not implemented
 */
eventsRouter.post("/", postEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   patch:
 *     summary: Update event (optional/admin)
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Event updated
 *       501:
 *         description: Not implemented
 */
eventsRouter.patch("/:id", patchEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete event (optional/admin)
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Event deleted
 *       501:
 *         description: Not implemented
 */
eventsRouter.delete("/:id", removeEvent);

export default eventsRouter;