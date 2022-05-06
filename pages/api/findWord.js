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
 * Returns a single orthogonal word that matches the exclude and match parameters
 */
export default function handler(req, res) {
  const excludeTokens = uniq(
    flatMap(req.body.exclude, (word) => word.split(""))
  );

  const matchTokens = uniq(flatMap(req.body.match, (word) => word.split("")));
  const orthoWords = filter(words, (word) =>
    every(
      getUniqueCharacters(word),
      (char) => !includes(excludeTokens, char) || includes(matchTokens, char)
    )
  );

  res.status(200).send(orthoWords[random(0, orthoWords.length)]);
}
