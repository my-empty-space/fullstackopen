import express from "express";
import morgan from "morgan";
import fs from "fs/promises";
import cors from "cors";
import Person from './models/Person.js'

console.log(process.env.PAR)

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

app.get("/api/persons", async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (error) {
    next(error);
  }
});

app.get("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const person = await Person.findById(id);
    if (!person)
      return res.status(404).send("<h1>404 - Person has not found</h1>");

    res.json(person);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletedPerson = await Person.findByIdAndDelete(id);
    console.log(deletedPerson);

    if (!deletedPerson) return res.status(404).json({ message: "there is no person to delete with id: ", id });
    return res.status(204).send();
  }
  catch (error) {
    next(error);
  }
});

app.post("/api/persons", async (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  try {
    const newPerson = await Person.create({
      name: body.name,
      number: body.number,
    });
    res.json(newPerson);
  } catch (error) {
    next(error);
  }
});

app.put("/api/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "Missing name or number" });
  }

  try {
    const updatedPerson = await Person.findByIdAndUpdate(id, body, {
      returnDocument: "after",
      runValidators: true
    });
    if (!updatedPerson) return res.status(404).json({ error: "there is no person to update" })
    res.json(updatedPerson);
  }
  catch (error) {
    next(error);
  }
});

app.get(["/info", "/api/info"], async (req, res, next) => {
  try {
    const time = new Date();
    const totalPersons = await Person.countDocuments({});

    res.send(`
        <h1>Information</h1>
        <p>Phonebook has information of ${totalPersons} people</p>
        <p>${time}</p>
    `);
  } catch (error) {
    next(error);
  }
});

const errorHandlerMiddleware = (error, req, res, next) => {
  console.error("\n\n\n\n\n\n Aquiii: \n", error, "\n\n\n\n\n\n Aquiii: \n",);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }

  if (error.code === 11000) {
    return res.status(400).json({ error: "Name must be unique" });
  }

  if (error.name === "ValidationError") {
    return res.status(404).json({ error: `${error}` });
  }

  next(error);
};

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
