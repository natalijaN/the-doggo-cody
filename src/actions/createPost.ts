'use server'

import { supabase } from "../lib/supabase";

type Props = {
    title: string,
    description: string,
    breed: string
}

export async function createPost({title, description, breed} : Props) {
  try {

    if (!title || !description || !breed) {
      return { error: "Missing required fields" };
    }

    const { error } = await supabase.from("posts").insert([{ title, description, breed }]);

    if (error) {
      console.error("Supabase error:", error.message);
      return { error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { error: "Unknown error occurred" };
  }
}
