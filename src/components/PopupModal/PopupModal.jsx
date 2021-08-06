import React from "react";
import styles from "./styles.module.css";

const PopupModal = ({ children, title, on, setOn, save, onSave }) => {
  const backgroundAnimStyles = {
    visibility: on ? "visible" : "hidden",
    opacity: on ? 1 : 0,
  };
  const popupAnimStyles = {
    opacity: on ? 1 : 0,
    transform: on ? "translate(-50%, -50%)" : "translate(-50%, -70%)",
  };

  const closeSelf = () => {
    setOn(false);
  };

  return (
    <div className={styles.background} style={backgroundAnimStyles}>
      <div className={styles.root} style={popupAnimStyles}>
        <h2>{title}</h2>
        <div className={styles.children}>{children}</div>
        <div>
          {save && (
            <button
              className={styles.saveButton}
              onClick={() => {
                closeSelf();
                onSave();
              }}
            >
              Save
            </button>
          )}
          <button onClick={closeSelf} className={styles.closeButton}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
