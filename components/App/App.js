import React, { useState } from "react";
import InputField from "../InputField";
import { RotateLeftIcon } from "../RotateLeftIcon";
import { XMarkIcon } from "../XMarkIcon";
import styles from "./App.module.css";

const buildLabel = (numWords) => {
  if (!numWords) {
    return;
  }
  if (numWords === 1) {
    return "Give me an orthogonal word";
  }
  return "Give me another orthogonal word";
};

export const App = () => {
  const [value, setValue] = useState("");

  const [words, setWords] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("surprise me");
  const [disableButton, setDisableButton] = useState(false);

  const handleReset = () => {
    setWords([]);
    setDisableButton(false);
    setButtonLabel("lets try again");
    setValue("");
  };

  const handleButtonClick = async () => {
    let newWord;
    if (words.length) {
      const res = await fetch("/api/findWord", {
        body: JSON.stringify({ exclude: words }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      newWord = await res.text();
      if (!newWord) {
        setButtonLabel("thats all there is");
        return;
      }
    } else {
      const res = await fetch("/api/getRandomUniqueWord");
      newWord = await res.text();
    }
    setWords((prev) => [...prev, newWord]);
    setButtonLabel(buildLabel(words.length));
    setButtonLabel("another one!");
  };

  const handleDeleteWord = (index) => () => {
    console.log("Deleting word", { words, index, theWord: words[index] });
    setWords((prev) => prev.filter((_, wordsIndex) => index !== wordsIndex));
  };

  const handleManualFirstWord = (val) => {
    setWords((prev) => [val, ...prev.slice(1)]);
  };

  return (
    <div className={styles.container}>
      <div>
        {/* <InputField value={value} setValue={setValue} /> */}
        <InputField value={words?.[0] || ""} setValue={handleManualFirstWord} />
        <div className={styles.words}>
          {words.slice(1).map((word, index) => (
            <div className={styles.wordContainer} key={word}>
              <InputField value={word} setValue={setValue} />
              <button onClick={handleDeleteWord(index + 1)}>
                <XMarkIcon />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.buttons}>
        <button
          disabled={disableButton}
          className={styles.goButton}
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          <RotateLeftIcon />
        </button>
      </div>
    </div>
  );
};
