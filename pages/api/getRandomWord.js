// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import random from "lodash/random";

const wordsFileHandle = fs.readFileSync("./public/words.txt", "utf8");
const words = wordsFileHandle.toString().split("\n");

export default function handler(req, res) {
  res.send(words[random(0, words.length)]);
}
