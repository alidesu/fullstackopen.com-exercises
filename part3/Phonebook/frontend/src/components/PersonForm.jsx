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

  export default PersonForm