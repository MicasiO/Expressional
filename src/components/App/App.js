import styles from "./styles.module.css";
import React, { useState, useEffect } from "react";
import { readData } from "../../utils/dataSave";

import Titlebar from "../Titlebar/Titlebar";
import AddSection from "../AddSection/AddSection";

function App() {
  const [expressions, setExpressions] = useState([]);

  useEffect(() => {
    setExpressions(readData());
  }, []);
  return (
    <div>
      <Titlebar />
      <div className={styles.appRoot}>
        <div className={styles.title}>
          <h1>Expressional</h1>
        </div>
        <AddSection expressions={expressions} setExpressions={setExpressions} />
      </div>
    </div>
  );
}

export default App;
