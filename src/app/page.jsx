"use client";
import { createContext, useEffect, useState } from "react";
import "./page.css"
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";
import Settings from "./settings/page";
import Tags from "./tags/page";
import { NavigationDesktop } from "@/components/Navigation";

export const ScreenSize = createContext(null)

export default function Home() {
  const [isEmpty, setIsEmpty] = useState(true);
  const [notes, setNotes] = useState([]);
  const [screenSize, setScreenSize] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.from('notes').select("*").eq('archived', false);
      setNotes(data);
    }


    const noteChannel = supabase.channel('insert').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' },
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
  }, [])

  useEffect(() => {
    function handleResize() {
      setScreenSize(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    console.log(screenSize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <div className="main-container">
      <div className="container">
        <h2>All Notes</h2>

        {!isEmpty ? (
          <div className="empty-area">
            <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
          </div>
        ) : (
          notes?.map(x => (
            <Link href={`/notes/${x.id}`}>
              <div key={x.id} className="new-notes">
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
      {!isMobile ? (
        <ScreenSize.Provider value={screenSize}>
          <div>
            <NavigationDesktop />
            <Tags />
          </div>
        </ScreenSize.Provider>
      ) : null}
    </div>
  )
}