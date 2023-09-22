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
            notesService
              .getAll()
              .then((response) => {
                setPersons(response.data);
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
                setErrorMessage("Error: " + error.response.data.error); // Set the error message
              });
            setConfirmMessage(`Updated ${newName}`);
          })
          .catch((error) => {
            console.error("Update failed:", error);
            setErrorMessage("Error: " + error.response.data.error); // Set the error message
          });
      }
    } else {
      notesService
        .create(uploadName)
        .then((response) => {
          const newPerson = response.data;
          setPersons((prevPersons) => [...prevPersons, newPerson]);
          notesService
            .getAll()
            .then((response) => {
              setPersons(response.data);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
              setErrorMessage("Error: " + error.response.data.error); // Set the error message
            });
          setConfirmMessage(`Added ${newName}`);
        })
        .catch((error) => {
          console.error("Create failed:", error);
          setErrorMessage("Error: " + error.response.data.error); // Set the error message
        });
    }

    setNewName("");
    setPhoneNumber("");
  };

  useEffect(() => {
    notesService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setErrorMessage("Error: " + error.response.data.error); // Set the error message
      });
  }, []);

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
