import { supabase } from "@/src/app/lib/supabaseClient";
import { redirect } from "next/navigation";

export async function handleDelete(id) {
  const { error } = await supabase.from('notes').delete().eq('id', id);
  if (error) {
    console.error("Silme hatası:", error);
  } else {
    redirect("/");
  }
}

export async function handleArchive(id) {
  const { error } = await supabase.from('notes').update({ archived: true }).eq('id', id);
  if (error) {
    console.error("Arşivleme hatası:", error);
  } else {
    console.log("Not başarıyla arşivlendi!");
    redirect("/");
  }
}
