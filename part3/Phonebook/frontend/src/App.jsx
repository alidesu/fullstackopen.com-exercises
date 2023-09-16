import React, { useState, useEffect } from "react";
import notesService from "./services/notesService";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import ErrorMessage from "./components/ErrorMessage";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filters, setFilters] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clickHandler = () => {
    setConfirmMessage(`Added ${newName}`);
    const uploadName = { name: newName, number: phoneNumber };
    const existingPerson = persons.find(
      (person) => person.name === uploadName.name
    );

    if (existingPerson) {
      const confirmation = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the number?`
      );

      if (confirmation) {
        notesService
          .update(existingPerson.id, { ...existingPerson, number: phoneNumber })
          .then((response) => {
            const updatedPerson = response.data;
            setPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          })
          .catch((error) => {
            console.error("Update failed:", error);
          });
      }
    } else {
      notesService
        .create(uploadName)
        .then((response) => {
          const newPerson = response.data;
          setPersons((prevPersons) => [...prevPersons, newPerson]);

          // Fetch data after adding a new person
          notesService
            .getAll()
            .then((response) => {
              setPersons(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        })
        .catch((error) => {
          console.error("Create failed:", error);
        });
    }

    setNewName("");
    setPhoneNumber("");
  };

  useEffect(() => {
    // Fetch data initially when the component mounts
    notesService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run once on mount

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={confirmMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter filters={filters} persons={persons} setFilters={setFilters} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        clickHandler={clickHandler}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
