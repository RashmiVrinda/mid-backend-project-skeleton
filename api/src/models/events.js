import db from "#configs/database.js";

const TABLE = "event";

/**
 * Event model (MVC example)
 */

/**
 * Returns a base query builder for the event table.
 *
 * @param {import("knex").Knex} [trx=db] - Optional transaction
 * @returns {import("knex").Knex.QueryBuilder}
 */
function baseQuery(trx = db) {
    return trx(TABLE);
}

/**
 * Count events matching optional filters.
 *
 * @param {Object} [filters={}]
 * @param {Object} [options={}]
 * @param {import("knex").Knex} [options.trx] - Optional transaction
 *
 * @returns {Promise<number>} Total matching rows
 */
export async function countEvents(filters = {}, options = {}) {
    const { trx } = options;
    const qb = baseQuery(trx);

    // Apply search filter if 'q' is provided
    if (filters.q) {
        qb.where((builder) => {
            builder.where("title", "ilike", `%${filters.q}%`)
                   .orWhere("description", "ilike", `%${filters.q}%`);
        });
    }

    const row = await qb.count({ count: "*" }).first();
    const count = row?.count ?? row?.["count(*)"] ?? 0;

    return Number(count);
}

/**
 * List events with optional filters and offset-based pagination.
 *
 * @param {Object} [filters={}]
 * @param {Object} [options={}]
 * @param {number} [options.limit]
 * @param {number} [options.offset]
 * @param {string} [options.orderBy="id"]
 * @param {"asc"|"desc"} [options.order="asc"]
 * @param {import("knex").Knex} [options.trx]
 *
 * @returns {Promise<Array<Object>>}
 */
export async function listEvents(filters = {}, { limit, offset, orderBy = "id", order = "asc", trx } = {}) {
    const qb = baseQuery(trx);

    // Apply the search filter if 'q' is provided
    if (filters.q) {
        qb.where((builder) => {
            builder.where("title", "ilike", `%${filters.q}%`)
                   .orWhere("description", "ilike", `%${filters.q}%`);
        });
    }

    // Apply sorting
    qb.orderBy(
        orderBy,
        String(order).toLowerCase() === "desc" ? "desc" : "asc"
    );

    // Apply pagination
    if (Number.isInteger(limit) && limit > 0) {
        qb.limit(limit);
    }

    if (Number.isInteger(offset) && offset >= 0) {
        qb.offset(offset);
    }

    return qb;
}

/**
 * Find a single event by id.
 *
 * @param {number|string} id
 * @param {Object} [options={}]
 * @param {import("knex").Knex} [options.trx]
 *
 * @returns {Promise<Object|null>}
 */
export async function findEventById(id, { trx } = {}) {
    const row = await baseQuery(trx)
        .where({ id })
        .first();

    return row ?? null;
}

/**
 * OPTIONAL STRUCTURE PLACEHOLDERS
 */
export async function createEvent() {
    throw new Error("Optional placeholder: createEvent is intentionally not implemented");
}

export async function updateEvent() {
    throw new Error("Optional placeholder: updateEvent is intentionally not implemented");
}

export async function deleteEvent() {
    throw new Error("Optional placeholder: deleteEvent is intentionally not implemented");
}