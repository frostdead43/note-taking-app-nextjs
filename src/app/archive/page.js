"use client"
import { useEffect, useState } from "react";
import "./archive.css"
import "../globals.css"
import Link from "next/link";
import { createClient } from "../utils/supabase/client";

export default function Archive() {

  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    async function getArchived() {
      const supabase = await createClient()
      const { data, error } = await supabase.from('notes').select('*').eq('archived', true);
      if (error) {
        console.error(error);
      } else {
        setArchivedNotes(data);
        console.log(data);
      }
    }

    getArchived();
  }, []);



  return (
    <div className="container">
      <h2>Archived Notes</h2>
      <p>All your archived notes are stored here. You can restore or delete them anytime.</p>
      {archivedNotes.map(x => (
        <Link key={x.id} href={`/archive/${x.id}`}>
          <div className="new-notes">
            <h3>{x.title}</h3>
            <h5>{x.tags}</h5>
            <h6>{x.created_at}</h6>
            <hr />
          </div>
        </Link>
      ))}
    </div>
  )
}