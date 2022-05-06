import fs from "fs";
import path from "path";

export const initAllWords = () => {
  const dir = path.resolve("./public/words.txt");
  const wordsFileHandle = fs.readFileSync(dir, "utf8");
  return wordsFileHandle.toString().split("\n");
};

export const initUniqueWords = () => {
  const dir = path.resolve("./public/unique_words.txt");
  const wordsFileHandle = fs.readFileSync(dir, "utf8");
  return wordsFileHandle.toString().split("\n");
};
