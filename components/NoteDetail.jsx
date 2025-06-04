"use client";
import { use, useContext, useEffect, useRef, useState } from "react";

import "../src/app/page.css";
import "src/app/notes/[id]/detail.css";


import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/src/app/utils/supabase/client";
import WideColumnFooter from "./WideColumnFooter";
// import { supabase } from "@/src/app/lib/supabaseClient";



export function NoteDetail({ id, screenSize, setSelectedArea, isMobile }) {

  const [noteDetails, setNoteDetails] = useState(null);
  const [edit, setEdit] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);


  useEffect(() => {
    async function getPostDetail() {
      const supabase = await createClient();
      const { data, error } = await supabase.from("notes").select("*").eq("id", id).single();
      if (error) {
        console.error(error);
      } else {
        setNoteDetails(data);
        setEdit(data.body);
        setTitleEdit(data.title);
      }
    }

    getPostDetail();
  }, [id]);

  function handleChange(e) {
    setEdit(e.target.value);

  }

  function handleTitleChange(e) {
    setTitleEdit(e.target.value);
  }

  function handleOpenModal() {
    dialogRef.current.showModal();
  }
  function handleCloseModal() {
    dialogRef.current.close();
  }

  function handleOpenArchiveModal() {
    archiveRef.current.showModal();
  }

  function handleCloseArchiveModal() {
    archiveRef.current.close();
  }

  async function handleSave(e) {
    const supabase = await createClient();
    e.preventDefault();
    const { data, error } = await supabase.from("notes").update({ title: titleEdit, body: edit }).eq("id", id).select();

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      redirect("/");
    }
  }

  async function handleDelete(id) {
    const supabase = await createClient();
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error(error)
    } else {
      redirect("/");
    }
  }

  async function handleArchive(id) {
    const supabase = await createClient();

    const { error } = await supabase.from('notes').update({ archived: true }).eq('id', id);

    if (error) {
      console.error('Arşive gönderme hatası:', error);
    } else {
      console.log('Not başarıyla arşive gönderildi!');
      redirect("/");
    }
  }




  return (
    <>
      <form onSubmit={handleSave}>
        <div className="detail-container">
          {!isMobile ? <div>
            <div className="mobil-note-detail">
              <div>
                <button type="button" className="go-back-btn"><Link href={"/"}>Go Back</Link></button>
              </div>
              <div className="flex">
                <svg onClick={handleOpenModal} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.3767 3.10322L13.0586 4.53105H15.2581C15.9343 4.53105 16.4826 5.05735 16.4826 5.70658V6.57714C16.4826 7.02103 16.1077 7.38087 15.6454 7.38087H4.17056C3.70818 7.38087 3.33334 7.02103 3.33334 6.57714V5.70658C3.33334 5.05735 3.88158 4.53105 4.55787 4.53105H6.75739L7.43922 3.10322C7.6438 2.67474 8.0898 2.40002 8.5808 2.40002H11.2351C11.7261 2.40002 12.1721 2.67474 12.3767 3.10322Z" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.2 7.44061V14.3892C15.2 15.7209 14.0895 16.8004 12.7195 16.8004H7.09717C5.72725 16.8004 4.6167 15.7209 4.6167 14.3892V7.44061" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.49936 10.2531V13.8598M11.3164 10.2531V13.8598" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg onClick={handleOpenArchiveModal} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.5 7.78216V16.2169C21.5 19.165 19.4188 21 16.4736 21H8.52638C5.58119 21 3.5 19.165 3.5 16.2159V7.78216C3.5 4.83405 5.58119 3 8.52638 3H16.4736C19.4188 3 21.5 4.84281 21.5 7.78216Z" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15.5 14L12.4982 17L9.5 14" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12.498 17V10" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21.4336 7H3.55859" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <button type="button" className="cancel-btn"><Link href={"/"}>Cancel</Link></button>
                <button type="submit" className="save-btn">Save Note</button>
              </div>
            </div>
          </div> : ""}
          <div className="wide-column-section">


            <input type="text" value={titleEdit} onChange={handleTitleChange}  ></input>
            <div className="wide-column-inner">
              <div className="wide-column-input-group">
                <div >
                  <img src="../images/tag-mini.svg" alt="" />
                  <h6>Tags</h6>
                </div>
                <input type="text" defaultValue={noteDetails?.tags} ></input>
              </div>
              <div className="wide-column-input-group">
                <div>
                  <img src="../images/clock-icon.svg" alt="" />
                  <h6>Last edited</h6>
                </div>
                <input type="text" defaultValue={noteDetails?.created_at} disabled></input>
              </div>
            </div>
          </div>
          <div className="wide-column-textarea">
            <textarea value={edit} onChange={handleChange}></textarea>
          </div>

          <WideColumnFooter setSelectedArea={setSelectedArea} />
        </div>
      </form >
      <dialog ref={dialogRef}>
        <h3>Delete Note</h3>
        <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={() => handleDelete(id)}>Delete Note</button>
        </div>
      </dialog>
      <dialog ref={archiveRef}>
        <h3>Archive Note</h3>
        <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</p>
        <div className="modal-buttons">
          <button onClick={handleCloseArchiveModal}>Cancel</button>
          <button onClick={() => handleArchive(id)} style={{ background: "rgba(51, 92, 255, 1)" }} className="archive-modal-button">Archive Notes</button>
        </div>
      </dialog>



    </>
  );
}



