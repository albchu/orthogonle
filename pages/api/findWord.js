import uniq from "lodash/uniq";
import filter from "lodash/filter";
import every from "lodash/every";
import includes from "lodash/includes";
import random from "lodash/random";
import flatMap from "lodash/flatMap";
import { initAllWords } from "../../api-common/utils";

const words = initAllWords();

const getUniqueCharacters = (str) => uniq(str.split(""));

/**
 * Returns a single orthogonal word that matches the input parameters
 * @param exclude : Array<String> Will exclude all characters in all strings given.
 * @param softMatch: Array<String> Will include only matches that have these chars in any index position
 * @param hardMatch: Array<{char: String, index: number}> Will only return a match that includes precisely these chars at these indices
 */
export default function handler(req, res) {
  const excludeTokens = uniq(
    flatMap(req.body.exclude, (word) => word.split(""))
  );

  console.log("DA INPUT", req.body.hardMatch);

  const matchTokens = uniq(
    flatMap(req.body.softMatch, (word) => word.split(""))
  );

  // TODO: Hard match the words
  const orthoWords = filter(words, (word) =>
    every(
      getUniqueCharacters(word),
      (char) => !includes(excludeTokens, char) || includes(matchTokens, char)
    )
  );

  res.status(200).send(orthoWords[random(0, orthoWords.length)]);
}
