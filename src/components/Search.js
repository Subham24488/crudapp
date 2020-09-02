import React, { useState } from "react";

const Search = ({ filterContacts }) => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchContact = search.toLowerCase().replace(/\s/g, "");

    filterContacts(searchContact);
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
    </nav>
  );
};

export default Search;
