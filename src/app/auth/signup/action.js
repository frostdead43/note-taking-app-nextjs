"use server";
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { createClient } from "../../utils/supabase/server"

export async function signup(formData) {
  const supabase = await createClient();

  const email = formData.get('email');
  const password = formData.get('password');

  // Önce kullanıcıyı auth ile kaydet
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({email,password});

  if (signUpError) {
    console.log(signUpError.message);
    return;
  }

  const user_id = signUpData.user?.id;

  
  if (user_id) {
    const { data: insertData, error: insertError } = await supabase.from("users").insert([{ id: user_id, email }]);

    if (insertError) {
      console.log(insertError.message);
      
    }
  }

  revalidatePath('/');
  redirect('/auth/login');
}
