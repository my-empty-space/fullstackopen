import { useState, useEffect } from "react";
import personServices from "/src/services/persons.js";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import ToastNotification from "./components/ToastNotification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("Elias Eduardo");
  const [newNumber, setNewNumber] = useState("0261-7655044");
  const [filterByName, setFilterByName] = useState("");
  const [personsToShow, setPersonsToShow] = useState([]);
  const [toastData, setToastData] = useState({});

  useEffect(() => {
    personServices.getAll().then((personsList) => {
      setPersons(personsList);
      setPersonsToShow(personsList);
    });
  }, []);

  const clearInputs = () => {
    setNewName("");
    setNewNumber("");
    setFilterByName("");
  };

  const handleFilter = (event) => {
    const updatedFilterByName = event.target.value;
    setFilterByName(updatedFilterByName);

    if (updatedFilterByName === "") {
      setPersonsToShow(persons);
    } else {
      setPersonsToShow(
        persons.filter((element) => {
          const searchParam = element.name.toLowerCase();
          return searchParam.includes(updatedFilterByName);
        }),
      );
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      window.alert(`One or more fields are empty`);
      clearInputs();
      return;
    }

    const objNewPerson = {
      name: newName,
      number: newNumber,
    };

    // Verifica que no haya un registro en la base de datos que tenga el nombre
    // que el usuario introdujo, en el caso que sea afirmativo no agrega el
    // nuevo registro; sino que actualiza el existente.
    const repitedPerson = persons.find((e) => e.name === newName);
    if (repitedPerson !== undefined) {
      const confirmation = window.confirm(
        `${repitedPerson.name} is already added to phonebook, replace the old number with a new one?`,
      );

      if (confirmation) {
        personServices
          .update(repitedPerson.id, objNewPerson)
          .then((updatedItem) => {
            const newArr = persons.map((e) =>
              e.id === updatedItem.id ? updatedItem : e,
            );

            setToastData({
              message: `Information of ${objNewPerson.name} updated`,
              status: "success",
            });
            setTimeout(() => setToastData({}), 4000);

            setPersons(newArr);
            setPersonsToShow(newArr);
          })
          .catch((error) => {
            setToastData({
              message: `Information of ${objNewPerson.name} was deleted`,
              status: "error",
            });
            setTimeout(() => setToastData({}), 4000);
            console.error(error);
          });
      }

      clearInputs();
      return;
    }

    // Comportamiento por defecto.
    personServices.create(objNewPerson).then((newItem) => {
      setToastData({
        message: `Added: ${objNewPerson.name}`,
        status: "success",
      });
      setTimeout(() => setToastData({}), 2000);

      setPersons(persons.concat(newItem));
      setPersonsToShow(persons.concat(newItem));

      clearInputs();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find((e) => e.id === id).name}?`)) {
      personServices
        .deleteOne(id.toString())
        .then((deletedItem) => {
          setPersons(persons.filter((e) => e.id !== deletedItem.id));
          setPersonsToShow(
            personsToShow.filter((e) => e.id !== deletedItem.id),
          );
        })
        .catch((error) => {
          setToastData({
            message: `The item you are trying to delete does not exist on the server`,
            status: "warn",
          });

          setPersons(persons.filter((e) => e.id !== id));
          setPersonsToShow(personsToShow.filter((e) => e.id !== id));

          setTimeout(() => setToastData({}), 4000);
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filterByName={filterByName} handleFilter={handleFilter} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleSubmit={handleSubmit}
      />

      <h2>Numbers</h2>
      <PersonsList personsToShow={personsToShow} handleDelete={handleDelete} />

      <ToastNotification data={toastData} />
    </div>
  );
};

export default App;
