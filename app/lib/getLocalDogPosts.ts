import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/dogs.json");

export async function getLocalDogsPosts() {
  const fileData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileData);
}
