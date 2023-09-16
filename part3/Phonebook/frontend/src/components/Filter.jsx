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
  

export default Filter