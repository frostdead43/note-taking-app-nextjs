"use server";

import { supabase } from "./lib/supabaseClient";

export default async function handleSignUp(currentState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");


  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({email,password,});

  if (signUpError) {
    console.error("Sign-up error:", signUpError);
    return { error: true, message: signUpError.message };
  }
 

  const { data: insertData, error: insertError } = await supabase.from("users").insert([{ id: user_id, email }]);

  if (insertError) {
    console.error("Insert error:", insertError);
    return { error: true, message: insertError.message };
  }

  return {
    success: true,
    data: insertData,
  };
}
