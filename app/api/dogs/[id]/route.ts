import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/dogs.json");

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const fileData = await fs.readFile(filePath, "utf-8");
  const posts = JSON.parse(fileData);
  const post = posts.find((post: { id: string }) => post.id === params.id);
  if (!post) return NextResponse.json({ error: `Post not found! ${parseInt(params.id)}` }, { status: 404 });

  return NextResponse.json(post);
}
