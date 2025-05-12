"use client";
import { createContext, useEffect, useState, useContext } from "react";
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









export const ScreenSize = createContext(null)

export default function Home() {
  const [notes, setNotes] = useState([]);
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
      const { data } = await supabase.from('notes').select("*").eq('archived', false);
      setNotes(data);
    }

    async function getArchive() {
      const { data } = await supabase.from('notes').select("*").eq('archived', true);
      setGetArchivedNotes(data);
    }





    const noteChannel = supabase.channel('insert').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notes' },
      payload => {
        console.log(payload.new);
        setNotes(curr => [...curr, payload.new]);
        console.log(notes);
      }
    ).subscribe();
    getData();
    getArchive();
    console.log("rendered");

    return () => {
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
      console.log("loop");
    }
  }, [selectedArea]);

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
          {notes.length === 0 ? (
            <div className="empty-area">
              <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
            </div>
          ) : (
            <>
              <button onClick={() => setSelectedArea("new-note")} className="create-note-btn">+ Create New Note</button>
              {noteColumnArea === "all-notes" && (
                <AllNotes notes={displayedNotes} screenSize={screenSize} takeDetail={takeDetail} />
              )}
              {noteColumnArea === "filtered-tags" && (
                <FilteredTagsNotes notes={displayedNotes} screenSize={screenSize} takeDetail={takeDetail} />
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
            <NewNote id={detail?.id} screenSize={screenSize} />
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
          {isBtnActive && <BtnGroupColumn noteId={detail?.id} setSelectedArea={setSelectedArea} />}
        </div>
      </div>
      {isMobile ? (
        <ScreenSize.Provider value={screenSize}>
          <div className="column-group">
            <NavigationDesktop setSelectedArea={setSelectedArea} setNoteColumnArea={setNoteColumnArea} />
            <Tags setSelectedArea={setSelectedArea} takeTagsName={takeTagsName} />
          </div>

        </ScreenSize.Provider>
      ) : ''}

    </div>
  )
}
