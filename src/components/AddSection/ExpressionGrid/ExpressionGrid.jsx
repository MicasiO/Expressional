import React from "react";
import styles from "./styles.module.css";
import Masonry from "react-masonry-css";
import ExpressionItem from "./ExpressionItem/ExpressionItem";

const breakpointColumnsObj = {
  700: 2,
  500: 1,
};

const ExpressionGrid = ({
  expressions,
  setExpressions,
  filteredExpressions,
}) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.root}
      columnClassName={styles.root_column}
    >
      {filteredExpressions.map((expression, id) => {
        return (
          <ExpressionItem
            key={id}
            expression={expression}
            setExpressions={setExpressions}
          />
        );
      })}
    </Masonry>
  );
};
export default ExpressionGrid;
