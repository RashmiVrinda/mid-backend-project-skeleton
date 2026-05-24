/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('app_user').onDelete('CASCADE');
      table.decimal('total_price', 10, 2).notNullable();
      table.string('status').defaultTo('completed');
      table.timestamps(true, true);
    })
    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
      table.integer('product_id').unsigned(); 
      table.integer('quantity').notNullable();
      table.decimal('price_at_purchase', 10, 2).notNullable();
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders');
}