exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("authors")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("authors").insert([
        { first_name: "Margaret", last_name: "Mitchell" },
        { first_name: "Charlotte", last_name: "Brontë" },
        { first_name: "Jane", last_name: "Austen" },
      ]);
    });
};
