const express = require("express");
let persons = require("./src/models/data.js");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const port = process.env.PORT || 3000;

const pg = require("pg");
const { Pool } = pg;
// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "z",
  host: "localhost",
  database: "z",
  port: 5432, // Postgres server always runs on this port
};
// create new pool instance which create new clients lazily when needed
// pool ensures that these new clients connect automatically to server
// pool will dispatch every query passed to pool.query on the 1st avail idle client
// by default there's a max of 10 clients per pool
const pool = new Pool(pgConnectionConfigs);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

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

app.get("/", (req, res) => {
  res.send("hi");
});

app.get("/api/persons", (req, res) => {
  function queryCallback(error, result) {
    if (error) {
      console.log("Error executing query", error.stack);
      res.status(503).send(result.rows || "error");
    }
    res.send(JSON.stringify(result, null, 4));
    console.log(result.rows);
  }
  pool.query("SELECT * FROM students", queryCallback);
});

// app.get("/api/persons/:id", (req, res) => {
//   const id = req.params.id;
//   const person = persons.find((i) => i.id === Number(id));
//   if (!person) {
//     res.status(404).send("Error: person not found");
//   }
//   res.send(person);
// });

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const toBeDeletedId = [id];
  const sqlText = "DELETE FROM students WHERE id = $1";
  function handleDeletion(err, result) {
    if (err) {
      res.status(503).end();
      console.log("Error executing delete request");
    }
    res.send("Delete success");
  }
  pool.query(sqlText, toBeDeletedId, handleDeletion);
});

app.get("/info", (req, res) => {
  res.send(
    `<div>Phonebook has info for 2 people!</div>
    <br/>
    <div>${new Date().toString()}</div>`
  );
});

// app.post("/api/persons", (req, res) => {
//   const { firstName, lastName, mobile, gender } = req.body;

//   if (!name) {
//     res.status(404).send({ error: "name must be present" });
//   }
//   if (!number) {
//     res.status(404).send({ error: "number must be present" });
//   }
//   if (persons.find((i) => i.name === name)) {
//     res.status(404).send({ error: "name must be unique" });
//   }

//   const values = [firstName, lastName, mobile, gender];
//   const sqlText =
//     "INSERT INTO students(first_name, last_name, mobile, gender) VALUES ($1, $2, $3, $4)";

//   function handleAddPerson(err, result) {
//     if (err) {
//       console.log(err);
//       res.status(503).end();
//     }

//     res.send(result.rows);
//   }

//   pool.request(sqlText, values, handleAddPerson);

//   const newPerson = { id: crypto.randomUUID(), ...req.body };
//   persons = [...persons, newPerson];
//   res.end();
// });

app.put("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const { lastName, firstName } = req.body;

  const values = [id, firstName, lastName];
  const sqlText =
    "UPDATE students SET first_name = $2, last_name = $3 WHERE id = $1";
  function handleEdit(err, result) {
    if (err) {
      console.log(err);
      res.status(500).end();
    }
    res.send(`Updated id: ${id}`);
  }

  pool.query(sqlText, values, handleEdit);
});

app.listen(port, () => console.log("listening on port 3000"));

// --- NODE PG --- /////////////////////////////////////////////

// const { Client } = pg;

// create a client instance
// const client = new Client(pgConnectionConfigs);

// make the connection to the server
// client.connect();

// create the query done callback
// const whenQueryDone = (error, result) => {
//   if (error) {
//     console.log("error", error);
//   } else {
//     console.log(result.rows); // rows key has the data
//   }
//   client.end(); // close the connection
// };

// const inputData = ["lord", "slayer", 938232488, "t"];
// write the SQL query
// const sqlQuery = "SELECT * FROM students";
// const sqlQuery =
//   "INSERT INTO students(first_name, last_name, mobile, gender) VALUES($1, $2, $3, $4) RETURNING *";

// run the SQL query
// client.query(sqlQuery, inputData, whenQueryDone);

// --- NODE PG --- /////////////////////////////////////////////
