"use server";

import { redirect } from "next/navigation";  // redirect import edilmeli
import { createClient } from "./utils/supabase/server";

export async function createNote(currentState, formData) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  console.log("Auth data:", data.user.id);


  const title = formData.get("title");
  const tags = formData.get("tags");
  const body = formData.get("body");
  const created_at = new Date().toISOString().split("T")[0];

  const formObj = { title, tags, body, created_at, user_id: data.user.id };

  const { data: insertData, error: insertError } = await supabase.from("notes").insert([formObj]);

  if (insertError) {
    console.error("Insert error:", insertError);
    return { error: true, message: insertError.message };
  }

  return { success: true, data: insertData };
}
