import React, { useRef, useState } from "react";
import styles from "./InputField.module.css";
import clsx from "clsx";

const DisplayField = ({ value, setValue, onCharClick }) => {
  const inputRef = useRef();
  const [selectedChars, setSelectedChars] = useState(
    value
      .split("")
      .map((char, index) => ({ char, index, selectionType: "none" }))
  );
  const isReadOnly = !Boolean(setValue);

  console.log("selectedChars", JSON.stringify(selectedChars, null, 4));

  const focusInput = () => {
    !isReadOnly && inputRef.current && inputRef.current.focus();
  };

  const handleUpdate = (e) => {
    setValue?.(e.target.value);
  };

  return (
    <div
      className={clsx(styles.container, isReadOnly && styles.readOnly)}
      onClick={focusInput}
    >
      <div className={styles.valueContainer}>
        {value.split("").map((char, index) => (
          <div
            key={`${index}-${char}`}
            className={styles.char}
            onClick={() => onCharClick({ char, index })}
          >
            {char}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayField;
