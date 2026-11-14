import express from "express";
import morgan from "morgan";
import fs from "fs/promises";
import cors from "cors";
import Person from './models/Person.js'

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => (
  req.method === "POST"
    ? JSON.stringify(req.body)
    : ""
));

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to phonebook's API</h1> <p>Access to <a href='/api/persons'>/api/persons</a> to get all notes.</p>",
  );
});

app.get("/api/persons", async (req, res) => {
  const persons = await Person.find({});
  res.json(persons);
});

app.get("/api/persons/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findById(id);
  if (!person)
    return res.status(404).send("<h1>404 - Person has not found</h1>");

  res.json(person);
});

app.delete("/api/persons/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedPerson = await Person.findByIdAndDelete(id);
    console.log(deletedPerson);

    if (!deletedPerson) return res.status(404).json({ message: "there is no person to delete with id: ", id });
    return res.status(204).send();
  }
  catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

app.post("/api/persons", async (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  Person.create({
    name: body.name,
    number: body.number,
  })
    .then(newPerson => (
      res.json(newPerson)
    ))
    .catch(error => {
      const { errorResponse } = error;

      if (errorResponse.code === 11000) {
        console.error(errorResponse.errmsg);
        return res.status(400).json({ error: "Name must be unique" });
      }

      console.error(errorResponse);
      return res.status(500).json({ error: "Something went wrong" });
    });

});

app.get(["/info", "/api/info"], async (req, res) => {
  try {
    const time = new Date();
    const totalPersons = await Person.countDocuments({});

    res.send(`
        <h1>Information</h1>
        <p>Phonebook has information of ${totalPersons} people</p>
        <p>${time}</p>
    `);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
