/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // 1. Clear existing cart data to avoid foreign key conflicts on rerun
  await knex('cart_item').del();
  await knex('app_cart').del();

  // 2. Fetch a user and some events from your Week 1 seeds
  const user = await knex('app_user').first();
  const events = await knex('event').limit(2);

  if (!user || events.length < 2) {
    console.error("Missing data! Make sure to run your Week 1 seeds first.");
    return;
  }

  // 3. Create a test cart for the user
  const [cart] = await knex('app_cart').insert({
    user_id: user.id,
    status: 'active'
  }).returning('id');

  // 4. Add items to that cart
  await knex('cart_item').insert([
    { cart_id: cart.id, event_id: events[0].id, quantity: 1 },
    { cart_id: cart.id, event_id: events[1].id, quantity: 3 }
  ]);

  console.log('Successfully seeded Week 2 cart data for:', user.email);
};