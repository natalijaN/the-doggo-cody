import { getLocalDogsPosts } from "@/app/lib/getLocalDogPosts";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const posts = await getLocalDogsPosts();
      return NextResponse.json(posts);
    } catch (error) {
      return NextResponse.json({ error: `Failed to read file, here ${error}` }, { status: 500 });
    }
  }