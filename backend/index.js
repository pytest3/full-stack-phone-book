const express = require("express");
let persons = require("./src/models/data.js");
const fs = require("fs");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(express.json());

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);
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
  const { name, number } = req.body;

  if (!name) {
    res.status(404).send({ error: "name must be present" });
  }
  if (!number) {
    res.status(404).send({ error: "number must be present" });
  }
  if (persons.find((i) => i.name === name)) {
    res.status(404).send({ error: "name must be unique" });
  }

  const newPerson = { id: crypto.randomUUID(), ...req.body };
  persons = [...persons, newPerson];
  res.end();
});

app.listen(port, () => console.log("listening on port 3000"));
