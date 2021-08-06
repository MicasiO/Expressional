import React from "react";
import styles from "./styles.module.css";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form action="/" method="get" className={styles.root}>
      <input
        value={searchQuery}
        onInput={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search expressions"
        name="s"
      />
      <button type="submit">
        <i class="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
