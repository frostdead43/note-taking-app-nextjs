"use server"
import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

// Supabase URL ve Anonim Anahtarını .env dosyasından alın
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function login(formData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }
  
  const { error } = await supabase.auth.signInWithPassword(data);
  
  if (error) {
    console.log(error.message);
    redirect('/error');
  }

  redirect('/');
}