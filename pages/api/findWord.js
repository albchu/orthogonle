import fs from "fs";
import uniq from "lodash/uniq";
import filter from "lodash/filter";
import every from "lodash/every";
import includes from "lodash/includes";
import random from "lodash/random";
import flatMap from "lodash/flatMap";
import path from "path";

const dir = path.resolve("./public/words.txt");
const wordsFileHandle = fs.readFileSync(dir, "utf8");
const words = wordsFileHandle.toString().split("\n");

const getUniqueCharacters = (str) => uniq(str.split(""));

/**
 * Returns a single orthogonal word to the search input word array
 */
export default function handler(req, res) {
  const searchTokens = uniq(flatMap(req.body.search, (word) => word.split("")));
  const orthogonalWords = filter(words, (word) =>
    every(getUniqueCharacters(word), (char) => !includes(searchTokens, char))
  );

  res.status(200).send(orthogonalWords[random(0, orthogonalWords.length)]);
}
