/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  // This ensures a user can only have ONE cart with 'active' status.
  return knex.raw(`
    CREATE UNIQUE INDEX unique_active_cart_per_user 
    ON app_cart (user_id) 
    WHERE (status = 'active' AND user_id IS NOT NULL);
  `);
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  return knex.raw(`DROP INDEX unique_active_cart_per_user;`);
}