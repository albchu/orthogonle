import React, { useState, useRef } from "react";
import styles from "./InputField.module.css";

const InputField = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current && inputRef.current.focus();
  };
  return (
    <>
      <button onClick={() => setValue("")}>reset</button>
      <div className={styles.container} onClick={focusInput}>
        <input
          type="text"
          value={value}
          className={styles.input}
          onChange={(e) => setValue(e.target.value)}
          maxLength={5}
          ref={inputRef}
        />
        <div className={styles.valueContainer}>
          {value.split("").map((char) => (
            <div className={styles.char}>{char}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InputField;
