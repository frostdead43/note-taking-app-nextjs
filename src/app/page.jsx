"use client";
import { createContext, useEffect, useState, useContext, use } from "react";
import "./page.css"
import Link from "next/link";
import { supabase } from "./lib/supabaseClient";
import Tags from "./tags/page";
import { NavigationDesktop } from "@/components/Navigation";
import { filterNotesBySearch } from "./lib/filterNotes";
import NewNote from "./newNote/page";
import { NoteDetail } from "@/components/NoteDetail";
import { BtnGroupColumn } from "@/components/BtnGroupColumn";
import Settings from "./settings/page";
import Theme from "./settings/theme/page";
import Fonts from "./settings/fonts/page";
import Password from "./settings/password/page";
import ArchivedNotes from "@/components/ArchivedNotes";
import AllNotes from "@/components/AllNotes";
import FilteredTagsNotes from "@/components/FilteredTagsNotes";
import { redirect } from "next/navigation";
import { createClient } from "./utils/supabase/client";

export const ScreenSize = createContext(null);


export default function Home() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null)
  const [screenSize, setScreenSize] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [detail, setdetail] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [getArchivedNotes, setGetArchivedNotes] = useState([]);
  const [holdTag, setHoldTag] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [noteColumnArea, setNoteColumnArea] = useState("all-notes");
  const [isBtnActive, setIsBtnActive] = useState(false);




  useEffect(() => {
    async function getData() {
      const supabase = await createClient();

      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        redirect('/auth/login')
      }

      const { data, error } = await supabase.from('notes').select("*").eq('user_id', user.id).eq('archived', false);

      if (error) {
        console.error("Notları alırken hata:", error);
      }
      else {
        console.log("Notlar:", data)
        setNotes(data)
      };
    }




    async function getArchive() {
      const supabase = await createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('notes')
        .select("*")
        .eq('user_id', user.id)
        .eq('archived', true);

      if (error) {
        console.error("Arşivli notları alırken hata:", error);
      }
      else {
        console.log("arşiv:", data)
        setGetArchivedNotes(data)
      };
    }

    const supabase = createClient();
    const channel = supabase.channel('notes-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'notes',
      }, (payload) => {
        const note = payload.new;
        const isArchived = note?.archived;

        if (payload.eventType === 'INSERT') {
          setNotes(prev => {
            const alreadyExists = prev.some(n => n.id === note.id);
            return (!isArchived && !alreadyExists) ? [...prev, note] : prev;
          });
          setGetArchivedNotes(prev => {
            const alreadyExists = prev.some(n => n.id === note.id);
            return (isArchived && !alreadyExists) ? [...prev, note] : prev;
          });
        }

        if (payload.eventType === 'UPDATE') {
          if (isArchived) {
            setNotes(prev => prev.filter(n => n.id !== note.id));
            setGetArchivedNotes(prev => {
              const exists = prev.some(n => n.id === note.id);
              return exists ? prev.map(n => n.id === note.id ? note : n) : [...prev, note];
            });
          } else {
            setGetArchivedNotes(prev => prev.filter(n => n.id !== note.id));
            setNotes(prev => {
              const exists = prev.some(n => n.id === note.id);
              return exists ? prev.map(n => n.id === note.id ? note : n) : [...prev, note];
            });
          }
        }


        if (payload.eventType === 'DELETE') {
          setNotes(prev => prev.filter(n => n.id !== payload.old.id));
          setGetArchivedNotes(prev => prev.filter(n => n.id !== payload.old.id));
        }
      })
      .subscribe();

    getData();
    getArchive();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);


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


  const displayedNotes = noteColumnArea === "filtered-tags" ? filterNotesBySearch(allNotes, search) : filterNotesBySearch(notes, search);
  const displayedArchivedNotes = filterNotesBySearch(getArchivedNotes, search);




  function takeDetail(id) {
    const all = [...notes, ...getArchivedNotes];
    const note = all.find(x => x.id === id);
    setdetail(note);
    setSelectedArea("note-detail");
    setIsBtnActive(true);
  }


  function takeTagsName(tag) {
    const archivedNotes = getArchivedNotes.filter(x => x.tags === tag);
    const normalNotes = notes.filter(x => x.tags === tag);
    const allNotes = [...archivedNotes, ...normalNotes];
    console.log(allNotes);
    setHoldTag(tag);
    setAllNotes(allNotes);
    setNoteColumnArea("filtered-tags");
  }

  useEffect(() => {
    if (selectedArea === null) {
      setIsBtnActive(false);

    }
  }, [selectedArea]);

  useEffect(() => {
    if (noteColumnArea === "filtered-tags" && holdTag) {
      const archivedNotes = getArchivedNotes.filter(x => x.tags === holdTag);
      const normalNotes = notes.filter(x => x.tags === holdTag);
      const all = [...archivedNotes, ...normalNotes];
      setAllNotes(all);
    }
  }, [notes, getArchivedNotes]);



  return (
    <div className={isMobile ? "main-container" : ""}>
      <div className={isMobile ? "column-container" : "container"}>
        <div className="header-2">
          <h2>{noteColumnArea === "filtered-tags" ? <span>Notes Tagged: {holdTag}</span> : noteColumnArea === "archive" ? "Archived" : noteColumnArea === "settings" ? "Settings" : "All Notes"} </h2>
          <div className="header-filter-input-section">
            <input type="text" name="search" placeholder="Search by title,content, or tags..." onChange={e => setSearch(e.target.value)} value={search} />
            <img onClick={() => { setNoteColumnArea("settings"); setSelectedArea(null); setIsBtnActive(false) }} src="/images/setting-icon.svg" alt="" />
          </div>



        </div>
        <div className="notes-column">

          {notes.length === 0 && noteColumnArea === "all-notes" ? (
            <>
              <button onClick={() => setSelectedArea("new-note")} className="create-note-btn">+ Create New Note</button>
              <div className="empty-area">
                <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => setSelectedArea("new-note")} className="create-note-btn">+ Create New Note</button>

              {noteColumnArea === "all-notes" && (
                <AllNotes notes={displayedNotes} screenSize={screenSize} takeDetail={takeDetail} />
              )}
              {noteColumnArea === "filtered-tags" && (
                <FilteredTagsNotes notes={displayedNotes} screenSize={screenSize} takeDetail={takeDetail} setNoteColumnArea={setNoteColumnArea} />
              )}
              {noteColumnArea === "archive" && (
                <ArchivedNotes notes={displayedArchivedNotes} screenSize={screenSize} takeDetail={takeDetail} />
              )}
              {noteColumnArea === "settings" && (
                <Settings screenSize={screenSize} setSelectedArea={setSelectedArea} />
              )}
            </>
          )}



          <Link href="newNote">
            <img className="plus" src="/images/plus.svg" />
          </Link>
        </div>


        <div className="wide-column">
          {selectedArea === "note-detail" &&
            <NoteDetail id={detail?.id} isMobile={isMobile} setSelectedArea={setSelectedArea} />
          }
          {selectedArea === "new-note" &&
            <NewNote id={detail?.id} isMobile={isMobile} setSelectedArea={setSelectedArea} />
          }
          {selectedArea === "color" &&
            <Theme />
          }
          {selectedArea === "fonts" &&
            <Fonts />
          }
          {selectedArea === "password" &&
            <Password />
          }


        </div>
        <div>
          {isBtnActive && <BtnGroupColumn noteId={detail?.id} setSelectedArea={setSelectedArea} notes={[...notes, ...getArchivedNotes]} />}
        </div>
      </div>
      {isMobile ? (
        <ScreenSize.Provider value={screenSize}>
          <div className="column-group">
            <NavigationDesktop setSelectedArea={setSelectedArea} setNoteColumnArea={setNoteColumnArea} />
            <Tags setSelectedArea={setSelectedArea} takeTagsName={takeTagsName} notes={notes} />
          </div>

        </ScreenSize.Provider>
      ) : ''}

    </div>

  )

}
