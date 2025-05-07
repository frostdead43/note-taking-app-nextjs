"use client";
import { createContext, useEffect, useState } from "react";
import "./page.css"
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";

import Tags from "./tags/page";
import { NavigationDesktop } from "@/components/Navigation";
import Header, { HeaderMobile } from "@/components/Header";






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
      const width = window.innerWidth;
      setScreenSize(width);
      setIsMobile(width > 768);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);




  return (
    <div className={isMobile ? "main-container" : ""}>
      <div className={isMobile ? "container" : ""}>
        <div className="header-2">
          <HeaderMobile />




        </div>
        <div>
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

        </div>

        <Link href="newNote">
          <img className="plus" src="/images/plus.svg" />
        </Link>
        <div>
          dsad
        </div>
      </div>
      {isMobile ? (
        <ScreenSize.Provider value={screenSize}>
          <div className="column-group">
            <NavigationDesktop />
            <Tags />
          </div>

        </ScreenSize.Provider>
      ) : ''}

    </div>
  )
}