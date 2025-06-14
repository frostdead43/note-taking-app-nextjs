import { redirect, useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";



export async function handleDelete(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('notes').delete().eq('id', id);
  console.log(id);
  if (error) {
    console.error("Silme hatası:", error);
  } else {
    redirect("/");
  }
}

export async function handleArchive(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('notes').update({ archived: true }).eq('id', id);
  if (error) {
    console.error("Arşivleme hatası:", error);
  } else {
    console.log("Not başarıyla arşivlendi!");

    redirect("/");
  }
}

export async function handleRestore(id) {
  const supabase = await createClient();
  const { error } = await supabase.from('notes').update({ archived: false }).eq('id', id);

  if (error) {
    console.error('Arşive gönderme hatası:', error);
  } else {
    console.log('Not başarıyla arşivden çıkarıldı!');
  }
}

export async function handleLogout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error.message);
  } else {
    window.location.href = "/auth/login";
  }
};

