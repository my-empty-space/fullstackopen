import mongoose from "mongoose";
import { Schema } from "mongoose";

if (process.argv.length === 3) {
  const DB_PASSWORD = process.argv[2];
  mongoose.connect(
    `mongodb+srv://joseg200217_db_user:${DB_PASSWORD}@cluster0.ftdxggv.mongodb.net/phoneBook`,
  );

  mongoose.connection.close();
  process.exit();
} else if (process.argv.length !== 5) {
  console.error(
    "------------------------------------\nERROR: los argumentos enviados no son validos.\n------------------------------------\nSe esperaban los siguientes argumentos:\n1. Contrasena  2. Usuario 3. Numero de telefono",
  );

  process.exit();
}

const DB_PASSWORD = process.argv[2];
const USER_NAME = process.argv[3];
const PHONE_NUMBER = process.argv[4];

mongoose.connect(
  `mongodb+srv://joseg200217_db_user:${DB_PASSWORD}@cluster0.ftdxggv.mongodb.net/phoneBook`,
);

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

Person.create({
  name: USER_NAME,
  number: PHONE_NUMBER,
})
  .then((personEntry) => {
    console.log(
      `Added ${personEntry.name}, number: ${personEntry.number} to phonebook`,
    );
    mongoose.connection.close();
    process.exit();
  })
  .catch((error) => {
    console.error(error);
    mongoose.connection.close();
    process.exit(1);
  });
