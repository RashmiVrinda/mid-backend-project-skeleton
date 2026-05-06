/**
 * @param { import("knex").Knex } knex
 */
export async function seed(knex) {
  // Deletes ALL existing entries in app_user
  await knex('app_user').del();

  // Insert test user matching your migration columns
  await knex('app_user').insert([
    {
      name: 'Rashmi Dev',
      email: 'rashmi@test.com'
    }
  ]);
  
  console.log('User seed complete!');
};