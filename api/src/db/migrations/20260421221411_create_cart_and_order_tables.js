/**
 * @param {import("knex").Knex} knex
 */
export async function up(knex) {
  return knex.schema
    // 1. Cart Table
    .createTable('app_cart', (table) => {
      table.increments('id').primary();
      // Nullable user_id allows guest carts
      table.integer('user_id').unsigned().nullable().references('id').inTable('app_user').onDelete('SET NULL');
      table.string('status').defaultTo('active'); // "active" vs "converted"
      table.timestamps(true, true);
    })
    // 2. Cart Item Table
    .createTable('cart_item', (table) => {
      table.increments('id').primary();
      table.integer('cart_id').unsigned().notNullable().references('id').inTable('app_cart').onDelete('CASCADE');
      table.integer('event_id').unsigned().notNullable().references('id').inTable('event').onDelete('CASCADE');
      table.integer('quantity').defaultTo(1).notNullable();
    })
    // 3. Order Table (customer_order to avoid SQL reserved words)
    .createTable('customer_order', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('app_user');
      table.decimal('total_price', 10, 2).notNullable();
      table.timestamps(true, true);
    })
    // 4. Order Item Table (Stores the snapshot of the purchase)
    .createTable('order_item', (table) => {
      table.increments('id').primary();
      table.integer('order_id').unsigned().notNullable().references('id').inTable('customer_order').onDelete('CASCADE');
      table.integer('event_id').unsigned().notNullable().references('id').inTable('event');
      table.decimal('unit_price', 10, 2).notNullable(); // Snapshot of event.price
      table.integer('quantity').notNullable();
    });
}

/**
 * @param {import("knex").Knex} knex
 */
export async function down(knex) {
  return knex.schema
    .dropTableIfExists('order_item')
    .dropTableIfExists('customer_order')
    .dropTableIfExists('cart_item')
    .dropTableIfExists('app_cart');
}