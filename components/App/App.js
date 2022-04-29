import React, { useState } from "react";
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
  const [words, setWords] = useState([]);
  const [buttonLabel, setButtonLabel] = useState("Give me a word");
  const [disableButton, setDisableButton] = useState(false);

  const handleReset = () => {
    setWords([]);
    setDisableButton(false);
    setButtonLabel("Lets try again");
  };

  const handleButtonClick = async () => {
    console.log("AHH YOU FUCKER");
    let newWord;
    if (words.length) {
      const res = await fetch("/api/findWord", {
        body: JSON.stringify({ search: words }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      newWord = await res.text();
      if (!newWord) {
        setDisableButton(true);
        setButtonLabel("Thats all there is");
        return;
      }
    } else {
      const res = await fetch("/api/getRandomWord");
      newWord = await res.text();
    }
    setWords((prev) => [...prev, newWord]);
    setButtonLabel(buildLabel(words.length));
    setButtonLabel("Another one!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.words}>
        {words.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </div>
      <div>
        <button disabled={disableButton} onClick={handleButtonClick}>
          {buttonLabel}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};
