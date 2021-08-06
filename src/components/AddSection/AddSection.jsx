import React, { useState } from "react";
import AddButton from "./AddButton/AddButton";
import styles from "./styles.module.css";
import ExpressionGrid from "./ExpressionGrid/ExpressionGrid";
import SearchBar from "./SeachBar/SearchBar";

const AddSection = ({ setExpressions, expressions }) => {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("s");
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filterPosts = (posts, query) => {
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      const postName = post.title.toLowerCase();
      return postName.includes(query);
    });
  };
  const filteredExpressions = filterPosts(expressions, searchQuery);

  return (
    <div className={styles.root}>
      <AddButton setExpressions={setExpressions} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <ExpressionGrid
        filteredExpressions={filteredExpressions}
        setExpressions={setExpressions}
        expressions={expressions}
      />
    </div>
  );
};

export default AddSection;
