"use client";
import { useEffect, useState } from "react";
import "./page.css"
import Link from "next/link";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://scwvsuiejcjerhwafliw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjd3ZzdWllamNqZXJod2FmbGl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNDM3MTIsImV4cCI6MjA2MDgxOTcxMn0.T3SAH0eaQhC5Me4uy5o5rscrI9dB1DPzMJY9NMhX3i8"

export const supabase = createClient(supabaseUrl,supabaseAnonKey);
console.log(supabase);

export default function Home() {
const [isEmpty,setIsEmpty] = useState(true);
const [notes,setNotes] = useState([]);

useEffect(()=>{
  async function getData() {
    const { data } = await supabase.from('notes').select("*");
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
          <div key={x.id} className="new-notes">
            <h3>{x.title}</h3>
            <h5>{x.tags}</h5>
            <h6>{x.created_at}</h6>
            <hr />
          </div>
        ))
      )}

      <Link href="newNote">
        <img className="plus" src="/images/plus.svg" />
      </Link>
    </div>
  )
}