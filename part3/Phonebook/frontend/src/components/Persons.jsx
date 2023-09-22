import notesService from "../services/notesService";

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
      {Array.isArray(persons) && persons.length > 0 ? (
        persons.map((person, index) => (
          <div key={index}>
            {person && person.name && person.number ? (
              <p>
                {person.name} {person.number}{" "}
                <button
                  onClick={() => handleDeleteClick(person.id, person.name)}
                >
                  Delete
                </button>
              </p>
            ) : null}
          </div>
        ))
      ) : (
        <p>No persons to display</p>
      )}
    </div>
  );
};

export default Persons;
