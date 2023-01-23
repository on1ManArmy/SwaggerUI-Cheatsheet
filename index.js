const swaggerUiExpress = require("swagger-ui-express");
const express = require("express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./api.yaml");

const app = express();
app.use(express.json());

let users = [
  { id: 1, name: "Abhishek" },
  { id: 2, name: "Kumar" },
  { id: 3, name: "Rajput" },
];

app.use(
  "/api-docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerJsDocs)
);

app.get("/string", (req, res) => {
  res.status(200).send("This is a string");
});

app.get("/user", (req, res) => {
  res.status(200).send({ id: 1, name: "Abhishek" });
});

app.get("/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/users/:id", (req, res) => {
  const obj = users.find((x) => x.id === parseInt(req.params.id));
  res.status(200).send(obj);
});

app.post("/create", (req, res) => {
  users = [req.body, ...users];
  res.send(users);
});

app.listen(4000, () => {
  console.log("Up and running!!");
});
