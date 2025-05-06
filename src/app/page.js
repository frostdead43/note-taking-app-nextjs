"use client";
import { useEffect, useState } from "react";
import "./page.css"
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";

export default function Home() {
const [isEmpty,setIsEmpty] = useState(true);
const [notes,setNotes] = useState([]);

useEffect(()=>{
  async function getData() {
    const { data } = await supabase.from('notes').select("*").eq('archived', false);
    setNotes(data);
  }

  const noteChannel = supabase.channel('insert').on('postgres_changes',{ event: 'INSERT', schema: 'public', table: 'notes' },
        payload => {
          console.log(payload.new);
          setNotes(curr => [...curr, payload.new]);
          console.log(notes);
        }
      ).subscribe();
      getData();

      return () => {
        console.log('removed');
        supabase.removeChannel(noteChannel);
      }
},[])
console.log(notes);

  return (
    <div className="container">
      <h2>All Notes</h2>

      {!isEmpty ? (
        <div className="empty-area">
          <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
        </div>
      ) : (
        notes?.map(x => (
          <Link key={x.id} href={`/notes/${x.id}`}>
            <div className="new-notes">
              <h3>{x.title}</h3>
              <h5>{x.tags}</h5>
              <h6>{x.created_at}</h6>
              <hr />
            </div>
          </Link>
        ))
      )}

      <Link href="newNote">
        <img className="plus" src="/images/plus.svg" />
      </Link>
    </div>
  )
}