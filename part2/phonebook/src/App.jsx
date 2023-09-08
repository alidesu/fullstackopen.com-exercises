import React, { useState, useEffect } from "react";
import notesService from "./services/notesService";

const ErrorMessage = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return isVisible ? (
    <div
      style={{
        color: "red",
        background: "lightgrey",
        fontSize: "21px",
        fontWeight: "400",
        border: "5px solid",
        borderRadius: "10px",
        paddingLeft: "10px",
        marginBottom: "10px",
      }}
    >
      <p>{message}</p>
    </div>
  ) : null;
};

const Persons = ({ persons, setPersons, setErrorMessage }) => {
  const handleDeleteClick = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      notesService
        .Delete(id)
        .then(() => {
          const newArray = persons.filter((item) => item.id !== id);
          setPersons(newArray);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setErrorMessage(
              `Information of ${name} has already been removed from server`
            );
          }
        });
    } else {
      console.log("User canceled");
    }
  };

  return (
    <div>
      {persons.map((person, index) => (
        <div key={index}>
          <p>
            {person.name} {person.number}{" "}
            <button onClick={() => handleDeleteClick(person.id, person.name)}>
              Delete
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

const Filter = ({ filters, persons, setFilters }) => {
  return (
    <>
      <div>
        <form>
          <div>
            filter shown with{" "}
            <input
              type="text"
              value={filters}
              onChange={(e) => {
                setFilters(e.target.value);
              }}
            />
          </div>
        </form>
      </div>
      {filters &&
        persons
          .filter((person) =>
            person.name.toLowerCase().includes(filters.toLowerCase())
          )
          .map(({ name, number }, index) => (
            <p key={index}>
              {name} {number}
            </p>
          ))}
    </>
  );
};

const PersonForm = ({
  newName,
  setNewName,
  phoneNumber,
  setPhoneNumber,
  clickHandler,
}) => {
  return (
    <>
      <div>
        <form id="personForm">
          <div>
            name:{" "}
            <input
              type="text"
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
          </div>
          <div>
            number:{" "}
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
          <div>
            <button type="button" onClick={clickHandler}>
              add
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

const Notification = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return isVisible ? (
    <div
      style={{
        color: "green",
        background: "lightgrey",
        fontSize: "21px",
        fontWeight: "400",
        border: "5px solid",
        borderRadius: "10px",
        paddingLeft: "10px",
        marginBottom: "10px",
      }}
    >
      <p>{message}</p>
    </div>
  ) : null;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [filters, setFilters] = useState("");
  const [personsDeleted, setPersonsDeleted] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    notesService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, [personsDeleted]);

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
            setPersons(
              persons.map((person) =>
                person.id === updatedPerson.id ? updatedPerson : person
              )
            );
          });
      }
    } else {
      notesService.create(uploadName).then((response) => {
        setPersons([...persons, response.data]);
      });
    }

    setNewName("");
    setPhoneNumber("");
  };

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
