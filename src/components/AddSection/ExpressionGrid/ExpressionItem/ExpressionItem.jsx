import React, { useState } from "react";
import styles from "./styles.module.css";
import { deleteData, readData } from "../../../../utils/dataSave";

const { clipboard } = window.require("electron");

const ExpressionItem = ({ expression, setExpressions }) => {
  const [copied, setCopied] = useState(false);

  const setIsCopied = () => {
    clipboard.writeText(expression["value"]);
    setCopied(true);
  };
  const resetIsCopied = () => {
    setCopied(false);
  };

  const deleteExpression = () => {
    deleteData(expression);
    setExpressions(readData());
  };

  return expression["type"] === "text" ? (
    <TextExpression
      title={expression["title"]}
      value={expression["value"]}
      copied={copied}
      setIsCopied={setIsCopied}
      resetIsCopied={resetIsCopied}
      deleteExpression={deleteExpression}
    />
  ) : (
    <AddressExpression
      title={expression["title"]}
      value={expression["value"]}
      copied={copied}
      setIsCopied={setIsCopied}
      resetIsCopied={resetIsCopied}
      deleteExpression={deleteExpression}
    />
  );
};

const TextExpression = ({
  title,
  value,
  setIsCopied,
  copied,
  resetIsCopied,
  deleteExpression,
}) => {
  return (
    <div className={styles.textExpression}>
      <h1 title={title}>{title}</h1>

      <div className={styles.overlay} onMouseLeave={resetIsCopied}>
        <div
          className={styles.copyButton}
          style={{
            background: copied ? "rgba(92, 255, 92, 0.473)" : "none",
          }}
          onClick={setIsCopied}
        >
          <i
            className="bi bi-clipboard"
            style={{
              opacity: copied ? 0 : 1,
              transition: "all 0.2s",
            }}
          ></i>
          <i
            className="bi bi-check2"
            style={{ opacity: copied ? 1 : 0, transition: "all 0.2s" }}
          ></i>
        </div>
        <div className={styles.deleteButton} onClick={deleteExpression}>
          <i className="bi bi-x"></i>
        </div>
      </div>

      <p>{value}</p>
    </div>
  );
};
const AddressExpression = ({
  title,
  value,
  setIsCopied,
  copied,
  resetIsCopied,
  deleteExpression,
}) => {
  return (
    <div className={styles.textExpression}>
      <h1 title={title}>{title}</h1>

      <div className={styles.overlay} onMouseLeave={resetIsCopied}>
        <div
          className={styles.copyButton}
          style={{
            background: copied ? "rgba(92, 255, 92, 0.473)" : "none",
          }}
          onClick={setIsCopied}
        >
          <i
            className="bi bi-clipboard"
            style={{
              opacity: copied ? 0 : 1,
              transition: "all 0.2s",
            }}
          ></i>
          <i
            className="bi bi-check2"
            style={{ opacity: copied ? 1 : 0, transition: "all 0.2s" }}
          ></i>
        </div>
        <div className={styles.deleteButton} onClick={deleteExpression}>
          <i className="bi bi-x"></i>
        </div>
      </div>

      <img src={value} alt="" />
    </div>
  );
};

export default ExpressionItem;
