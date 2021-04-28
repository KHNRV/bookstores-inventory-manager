exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("books")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("books").insert([
        { title: "Gone with the Wind", isbn_13: "9780446675536", author_id: 1 },
        { title: "Jane Eyre", isbn_13: "9781551111803", author_id: 2 },
        {
          title: "Pride and Prejudice",
          isbn_13: "9780553213102",
          author_id: 3,
        },
        { title: "Emma", isbn_13: "9780141439587", author_id: 3 },
      ]);
    });
};
