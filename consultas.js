const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "pablo_softjobs",
});

//AUTH

const verificarCredenciales = async (email, password) => {
  const consulta = "SELECT * FROM usuarios1 WHERE email = $1 AND password = $2";
  const values = [email, password];
  const { rowCount } = await pool.query(consulta, values);
  if (!rowCount)
    throw {
      code: 404,
      message: "No se encontró ningún usuario con estas credenciales",
    };
};

const getJobs = async () => {
  const { rows: usuarios } = await pool.query("SELECT * FROM usuarios1");
  return usuarios;
};

const agregarUser = async ({ email, lenguage, password, rol }) => {
  console.log(email, lenguage, password, rol);
  const consulta =
    "INSER INTO usuarios1 (id, email, password, rol, lenguage) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING * ";
  const values = [email, password, rol, lenguage];
  await pool.query(consulta, values);
};

module.exports = { getJobs, verificarCredenciales, agregarUser };
