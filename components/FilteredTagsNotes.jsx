"use client";
import Link from "next/link";
import { useEffect } from "react";

export default function FilteredTagsNotes({ notes, screenSize, takeDetail, setNoteColumnArea }) {
  useEffect(() => {
    if (notes.length === 0) {
      setNoteColumnArea("all-notes");
    }
  }, [notes]);

  return (
    <>
      {notes.map(note => (
        <Link key={note.id} href={screenSize > 768 ? "#" : `/notes/${note.id}`}>
          <div className="new-notes" onClick={() => takeDetail(note.id)}>
            <h3>{note.title}</h3>
            <h5>{note.tags}</h5>
            <h6>{note.created_at}</h6>
            <hr />
          </div>
        </Link>
      ))}
    </>
  );
}
