import random from "lodash/random";
import { initUniqueWords } from "../../api-common/utils";
const words = initUniqueWords();

export default function handler(req, res) {
  res.send(words[random(0, words.length)]);
}
