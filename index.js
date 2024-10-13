const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const { getJobs, verificarCredenciales, agregarUser } = require("./consultas");

app.listen(3000, console.log("SERVER ON"));
app.use(cors());
app.use(express.json());

const JWT_SECRET_KEY = "6k!U?ñxiYk7T7P7Q7pZ$Aa~Y2";

//POST

app.post("/login", async (req, res) => {
  try {
    const { email, pasword } = req.body;
    await verificarCredenciales(email, pasword);
    const token = jwt.sign({ email }, JWT_SECRET_KEY);
    const Authorization = req.header("Authorization");
    console.log(Authorization);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

//GET

app.get("/usuarios", async (req, res) => {
  try {
    console.log(req);
    const Authorization = req.header("Authorization");
    console.log(Authorization);
    //const token = Authorization.split("Bearer ")[1];
    //console.log(token);
    //const getJobs = await getJobs();
    //res.json(getJobs);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    await agregarUser(req.body);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});

/*app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    await verificarCredenciales(email, password);
    const token = jwt.sign({ email }, JWT_SECRET_KEY);
    res.send(token);
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});*/
