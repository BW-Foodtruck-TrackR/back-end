
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('trucks').del()
    .then(function () {
      // Inserts seed entries
      return knex('trucks').insert([
        {truckName: 'taco truck', image: '', cuisineType: 'tacos' }
        {truckName: 'food truck', image: '', cuisineType: 'food' }
        {truckName: 'nacho truck', image: '', cuisineType: 'nacho' }
      ]);
    });
};
