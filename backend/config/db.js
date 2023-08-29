const Pool = require("pg").Pool;

const pool = new Pool({
  user: "moontoon",
  password: "157393",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
