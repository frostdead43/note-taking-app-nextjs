"use client";
import { use, useContext, useEffect, useRef, useState } from "react";

import "../src/app/page.css";
import "src/app/notes/[id]/detail.css";


import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/src/app/lib/supabaseClient";



export function NoteDetail({ id, screenSize, setSelectedArea, isMobile }) {

  const [noteDetails, setNoteDetails] = useState(null);
  const [edit, setEdit] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);


  useEffect(() => {
    async function getPostDetail() {
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
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error(error)
    } else {
      redirect("/");
    }
  }

  async function handleArchive(id) {
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
        {/* <div className="detail-container">
          <div className="menu-bar">
            <div>
              <Link href={"/"}><button type="button">Go Back</button></Link>
            </div>
            <div className="flex">
              <img onClick={handleOpenModal} src="../images/delete-icon.svg" />
              <img onClick={handleOpenArchiveModal} src="../images/archive-icon.svg" />
              <Link href={"/"}><button type="button">Cancel</button></Link>
              <button type="submit" className="save-btn">Save Note</button>
            </div>
          </div>
          <div className="body">
            <input className="title-input" type="text" name="title" value={titleEdit} onChange={handleTitleChange}></input>
            <div className="new-note-body">
              <div className="note-input">
                <img src="../images/tag-mini.svg" />
                <h6>Tags</h6>
                <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{noteDetails?.tags}</h6>
              </div>
              <div className="note-input">
                <img src="../images/clock-icon.svg" />
                <h6>Last edited</h6>
                <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{noteDetails?.created_at}</h6>
              </div>
            </div>
            <hr />
            <div className="asd">
              <textarea value={edit} onChange={handleChange}></textarea>
            </div>
          </div>
        </div> */}
        {/* mediadan dolayı tel patladı */}
        <div className="detail-container">

          {!isMobile ? <div>
            <div className="mobil-note-detail">
              <div>
                <Link href={"/"}><button type="button" className="go-back-btn">Go Back</button></Link>
              </div>
              <div className="flex">
                <img onClick={handleOpenModal} src="../images/delete-icon.svg" />
                <img onClick={handleOpenArchiveModal} src="../images/archive-icon.svg" />
                <Link href={"/"}><button type="button" className="cancel-btn">Cancel</button></Link>
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

          <div className="wide-column-footer">
            <button className="save-btn" type="submit">Save Note</button>
            <button className="cancel-btn" type="button" onClick={() => setSelectedArea(null)}>Cancel</button>
          </div>
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

// export function BtnGroupColumn(){
//  return (
//   <div className="btn-group-column">
//    <button></button>
//    <button onClick={() => handleArchive(id)}></button>
//   </div>
//  )
// }


