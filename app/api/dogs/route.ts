import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "app/data/dogs.json");

export async function GET() {
    try {
      const fileData = await fs.readFile(filePath, "utf-8");
      const posts = JSON.parse(fileData);
      return NextResponse.json(posts);
    } catch (error) {
      return NextResponse.json({ error: `Failed to read file, here ${error}` }, { status: 500 });
    }
  }