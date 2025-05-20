"use server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signupAct(formData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const { data: signUpData, error } = await supabase.auth.signUp(data);
  
  if (error) {
    console.log(error.message);
    redirect('/error')
  }

  const user_id = signUpData.user?.id;

  if (user_id) {
    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([{ id: user_id, email: data.email }]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return { error: true, message: insertError.message };
    }
  } 
  redirect('/login');
}
