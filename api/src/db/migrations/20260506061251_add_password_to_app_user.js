/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.alterTable("app_user", (table) => {
 
   table.string("password_hash").notNullable().defaultTo('change_me');

    table.string("role").defaultTo("user").notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.alterTable("app_user", (table) => {
    table.dropColumn("password_hash");
    table.dropColumn("role");
  });
}