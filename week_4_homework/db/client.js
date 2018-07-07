const knexfile = require("../knexfile");

// The knex package exports a function. Call this function
// with the configuration for your db. We normally store
// this configuration inside of knexfile.js.
const knex = require("knex")(knexfile["development"]);

module.exports = knex;
