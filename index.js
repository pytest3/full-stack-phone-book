const express = require("express");
let persons = require("./src/models/data.js");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

console.log(persons);
console.log(typeof persons);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/persons", (req, res) => {
  res.send(JSON.stringify(persons, null, 4));
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((i) => i.id === Number(id));
  if (!person) {
    res.status(404).send("Error: person not found");
  }
  res.send(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((i) => {
    return i.id !== Number(id);
  });
  // fs.writeFile(
  //   "./src/models/data.js",
  //   JSON.stringify(`module.exports=${JSON.stringify(newPersons)}`),
  //   "utf8",
  //   (err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   }
  // );

  res.status(204).end();
});

app.get("/info", (req, res) => {
  res.send(
    `<div>Phonebook has info for 2 people!</div>
    <br/>
    <div>${new Date().toString()}</div>`
  );
});

app.post("/api/persons", (req, res) => {
  console.log(req.get("Content-Type"));

  res.end();
});

// console.log(app._router.stack);

app.listen(port, () => console.log("listening on port 3000"));
