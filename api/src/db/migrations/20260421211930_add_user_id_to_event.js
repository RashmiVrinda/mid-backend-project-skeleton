export async function up(knex) {
  await knex.schema.alterTable("event", (table) => {
    // We add the column, but we DO NOT make it .notNullable()
    // This lets the project work exactly as it did before.
    table.integer("user_id")
      .unsigned()
      .references("id")
      .inTable("app_user")
      .onDelete("SET NULL"); 
  });
}

export async function down(knex) {
  await knex.schema.alterTable("event", (table) => {
    table.dropColumn("user_id");
  });
}