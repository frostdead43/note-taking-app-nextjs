"use server";
import { supabase } from "./lib/supabaseClient";

export async function createNote(currentState, formData) {  
  const title = formData.get("title");
  const tags = formData.get("tags");
  const body = formData.get("body");
  const created_at = formData.get("created_at");

  const formObj = { title, tags, body,created_at };

  const { data, error } = await supabase.from("notes").insert([formObj]);

  if (error) {
    console.error("Insert error:", error);
    return { error: true, message: error.message };
  }

  return { success: true, data };
}