import React, { useState } from "react";
import styles from "./styles.module.css";
import PopupModal from "../../PopupModal/PopupModal";
import { ToastContainer, toast, Slide } from "react-toastify";
import { postData, readData } from "../../../utils/dataSave";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const AddButton = ({ setExpressions }) => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [fileType, setFileType] = useState("address");
  const [fileValue, setFileValue] = useState("");
  const [fileTitle, setFileTitle] = useState("");

  const openAddModal = () => {
    setFileValue("");
    setFileType("address");
    setAddModalIsOpen(true);
    setFileTitle("");
  };

  const changeFileType = (e) => {
    setFileType(e.target.value);
  };

  const changeFileValue = (e) => {
    setFileValue(e.target.value);
  };

  const onTitleInputChange = (e) => {
    setFileTitle(e.target.value);
  };

  const saveNewExpression = () => {
    const newExpression = {
      value: fileValue,
      type: fileType,
      title: fileTitle,
      id: uuidv4(),
    };
    if (fileValue.trim() === "" || fileTitle.trim() === "") {
      showInputError("Field(s) are empty");
    } else {
      postData(newExpression);
      setExpressions(readData());
    }
  };

  const showInputError = (message) => {
    toast.error(message);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        closeButton={false}
        transition={Slide}
      />
      <button className={styles.root} onClick={openAddModal}>
        <i className="bi bi-plus-lg"></i>
      </button>
      <PopupModal
        save={true}
        onSave={saveNewExpression}
        title="Add new expression"
        on={addModalIsOpen}
        setOn={setAddModalIsOpen}
      >
        <div className="settings-row">
          <p>File type</p>
          <select
            className={styles.select}
            onChange={changeFileType}
            value={fileType}
          >
            <option value="address">Image/GIF address</option>
            <option value="text">Text</option>
          </select>
        </div>
        <div className="settings-row">
          <p>Title</p>
          <input
            className={styles.titleInput}
            type="text"
            value={fileTitle}
            onChange={onTitleInputChange}
          />
        </div>
        {fileType === "address" && (
          <input
            type="text"
            placeholder="Image address"
            className={styles.addressInput}
            value={fileValue}
            onChange={changeFileValue}
          />
        )}
        {fileType === "text" && (
          <textarea
            placeholder="Text"
            className={styles.textInput}
            value={fileValue}
            onChange={changeFileValue}
          />
        )}
      </PopupModal>
    </>
  );
};

export default AddButton;
