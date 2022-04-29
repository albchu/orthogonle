// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import uniq from "lodash/uniq";
import filter from "lodash/filter";
import every from "lodash/every";
import includes from "lodash/includes";

const wordsFileHandle = fs.readFileSync("./public/words.txt", "utf8");
const words = wordsFileHandle.toString().split("\n");

const getUniqueCharacters = (str) => uniq(str.split(""));

/**
 * Returns all the orthogonal word matches to the search input
 */
export default function handler(req, res) {
  //  Remove all words that include any of the letters in the input word
  const searchTokens = getUniqueCharacters(req.body.search);
  const orthogonalWords = filter(words, (word) =>
    every(getUniqueCharacters(word), (char) => !includes(searchTokens, char))
  );

  res.status(200).json(orthogonalWords);
}
