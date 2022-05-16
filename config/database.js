const pgtools = require("pgtools");
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mtor-project",
    password: "password",
    port: "5432"
});

module.exports = pool;