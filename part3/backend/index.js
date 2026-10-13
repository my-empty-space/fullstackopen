import express from "express";
import morgan from "morgan";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const PORT = 3001;

const getPersons = async () => {
  try {
    const data = await fs.readFile("./db.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading or parsing db.json:", error);
    throw error;
  }
};

let persons = await getPersons();

function generateId() {
  return Math.floor(Math.random() * 99999999);
}

app.use(express.json());
app.use(cors());

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.get("/", (req, res) => {
  res.send(
    "<h1>Welcome to phonebook's API</h1> <p>Access to <a href='/api/persons'>/api/persons</a> to get all notes.</p>",
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((e) => e.id === id);
  if (!person)
    return res.status(404).send("<h1>404 - Person has not found</h1>");

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const filteredPersons = persons.filter((e) => e.id !== id);
  if (filteredPersons.length === persons.length) {
    return res.status(404).json({ error: "Person has not found" });
  }
  // Opcion con splice, esta me parece peor pues tene un O mayor.
  // const deletionIndex = persons.findIndex((e) => e.id === id)
  // if (deletionIndex < 0) return  res.status(404).end();

  // persons = persons.spice()

  persons = filteredPersons;
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number)
    return res.status(400).json({ error: "Missing name or number" });

  if (persons.some((person) => person.name === body.name)) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(newPerson);
  res.json(newPerson);
});

app.get("/api/info", (req, res) => {
  const time = new Date();
  res.send(`
        <h1>Information</h1>
        <p>Phonebook has information of ${persons.length} people</p>
        <p>${time}</p>
    `);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
