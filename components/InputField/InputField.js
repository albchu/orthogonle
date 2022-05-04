import React, { useRef } from "react";
import styles from "./InputField.module.css";

const InputField = ({ value, setValue }) => {
  const inputRef = useRef();
  const focusInput = () => {
    inputRef.current && inputRef.current.focus();
  };

  const handleUpdate = (e) => {
    setValue?.(e.target.value);
  };

  return (
    <div className={styles.container} onClick={focusInput}>
      <input
        spellCheck={false}
        type="text"
        value={value}
        className={styles.input}
        onChange={handleUpdate}
        maxLength={5}
        ref={inputRef}
      />
      <div className={styles.valueContainer}>
        {value.split("").map((char, index) => (
          <div className={styles.char}>{char}</div>
        ))}
      </div>
    </div>
  );
};

export default InputField;
