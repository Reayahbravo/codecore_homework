
exports.up = knex => {
    return knex.schema.createTable("cohorts", table => {
        table.increments("id");
        // Create a column named "id" that uses
        // the SERIAL type in postgres. This will
        // be our PRIMARY KEY.
        table.string("name");
        table.text("members");
        table.string("logoUrl");
  });
};

exports.down = knex => {
    return knex.schema.dropTable("cohorts");
};
