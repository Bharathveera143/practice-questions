import * as path from "path";
import { readFileContent, countWordFrequency, saveResults } from "./utils";

async function main() {
  const filePath = path.join(__dirname, "..", "sample.txt");

  // Step 1: Read file
  const content = await readFileContent(filePath);

  // Step 2: Count words
  const wordCounts = countWordFrequency(content);

// Step 3: Save results
  await saveResults("word-frequency.json", wordCounts);

  console.log("Word Frequency:", wordCounts);
}

main().catch((err) => console.error("❌ Error:", err));
