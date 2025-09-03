import * as fs from "fs/promises";
import * as path from "path";

// Function: Read file
export async function readFileContent(filePath: string): Promise<string> {
  const data = await fs.readFile(filePath, "utf-8");
  return data;
}

// Function: Count word frequency using Map
export function countWordFrequency(text: string): Record<string, number> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "") // remove symbols/punctuation
    .split(/\s+/) // split by space/newline
    .filter(Boolean);

  const wordMap = new Map<string, number>();

  for (const word of words) {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  }

  // Convert Map → Record (Object)
  const result: Record<string, number> = {};
  wordMap.forEach((count, word) => {
    result[word] = count;
  });

  return result;
}

// Function: Save results to JSON
export async function saveResults(fileName: string, data: Record<string, number>): Promise<void> {
  const filePath = path.join(__dirname, "..", fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`✅ Results saved to ${filePath}`);
}
