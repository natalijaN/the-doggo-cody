import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/dogs.json");

export async function getLocalDogPostById(id: string) {
  const fileData = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(fileData);
  return posts.find((post: { id: string }) => post.id === id);

}
