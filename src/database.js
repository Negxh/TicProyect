const { Pool } = require("pg")

// Coloca aquí tus credenciales
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "prueba_esp",
    port: 5432,
});
module.exports = pool;