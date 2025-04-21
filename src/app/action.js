"use server";
import { supabase } from "./lib/supabaseClient";

console.log(supabase);


export async function createNote(currentState,formData) {  
  const formObj = Object.fromEntries(formData);
  const { data } = await supabase.from('notes').insert([formObj,]).select();
  console.log(formObj);
}
