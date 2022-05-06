import random from "lodash/random";
import { initAllWords } from "../../api-common/utils";

const words = initAllWords();

export default function handler(req, res) {
  res.send(words[random(0, words.length)]);
}
