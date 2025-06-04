"use client"

import "./archiveDetail.css"
import Link from "next/link";
import { use, useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/client";



export default function Page({ params }) {
  const unwrappedArchiveParams = use(params);
  const { id } = unwrappedArchiveParams;

  const [archiveDetail, setArchiveDetail] = useState(null);
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);


  useEffect(() => {
    async function getArchiveData() {
      const supabase = createClient();
      const { data } = await supabase.from("notes").select("*").eq("id", id).single();
      setArchiveDetail(data);
      console.log(data);
    }
    getArchiveData();
  }, [])

  function handleOpenModal() {
    dialogRef.current.showModal();
  }

  function handleCloseModal() {
    dialogRef.current.close();
  }

  async function handleDelete(id) {
    const supabase = createClient();
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error(error)
    } else {
      redirect("/");
    }
  }

  async function handleArchive(id) {
    const supabase = createClient();
    const { error } = await supabase.from('notes').update({ archived: false }).eq('id', id);

    if (error) {
      console.error(error.message);
    } else {
      redirect("/archive");
    }
  }

  function handleOpenArchiveModal() {
    archiveRef.current.showModal();
  }

  function handleCloseArchiveModal() {
    archiveRef.current.close();
  }

  return (
    <>
      <form >
        <div className="detail-container">
          <div className="menu-top-bar">
            <div>
              <Link href={"/archive"}><button type="button">Go Back</button></Link>
            </div>
            <div className="flex">
              <svg onClick={handleOpenModal} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.3767 3.10322L13.0586 4.53105H15.2581C15.9343 4.53105 16.4826 5.05735 16.4826 5.70658V6.57714C16.4826 7.02103 16.1077 7.38087 15.6454 7.38087H4.17056C3.70818 7.38087 3.33334 7.02103 3.33334 6.57714V5.70658C3.33334 5.05735 3.88158 4.53105 4.55787 4.53105H6.75739L7.43922 3.10322C7.6438 2.67474 8.0898 2.40002 8.5808 2.40002H11.2351C11.7261 2.40002 12.1721 2.67474 12.3767 3.10322Z" stroke="#0E121B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.2 7.44061V14.3892C15.2 15.7209 14.0895 16.8004 12.7195 16.8004H7.09717C5.72725 16.8004 4.6167 15.7209 4.6167 14.3892V7.44061" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.49936 10.2531V13.8598M11.3164 10.2531V13.8598" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg onClick={handleOpenArchiveModal} width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.5 7.78216V16.2169C21.5 19.165 19.4188 21 16.4736 21H8.52638C5.58119 21 3.5 19.165 3.5 16.2159V7.78216C3.5 4.83405 5.58119 3 8.52638 3H16.4736C19.4188 3 21.5 4.84281 21.5 7.78216Z" stroke="#525866" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.5 14L12.4982 17L9.5 14" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.498 17V10" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21.4336 7H3.55859" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <Link href={"/archive"}><button type="button">Cancel</button></Link>
              <button type="submit" className="save-btn">Save Note</button>
            </div>
          </div>
          <div className="note-section">
            <input disabled defaultValue={archiveDetail?.title} className="title-input" type="text" name="title"  ></input>
            <div className="new-note-body">
              <div className="note-input">
                <img src="../images/tag-mini.svg" />
                <h6>Tags</h6>
                <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{archiveDetail?.tags}</h6>
              </div>
              <div className="note-input">
                <img src="../images/clock-icon.svg" />
                <h6>Last edited</h6>
                <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{archiveDetail?.created_at}</h6>
              </div>
            </div>
            <hr />
            <div className="asd">
              <textarea defaultValue={archiveDetail?.body} disabled></textarea>
            </div>
          </div>
        </div>
      </form>
      <dialog ref={dialogRef}>
        <h3>Delete Note</h3>
        <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={handleCloseModal}>Cancel</button>
          <button onClick={() => handleDelete(id)}>Delete Note</button>
        </div>
      </dialog>
      <dialog ref={archiveRef}>
        <h3>Restore Note</h3>
        <p>Are you sure you want to restore this note? You can find it and archive it anytime.</p>
        <div className="modal-buttons">
          <button onClick={handleCloseArchiveModal}>Cancel</button>
          <button onClick={() => handleArchive(id)} style={{ background: "rgba(51, 92, 255, 1)" }} className="archive-modal-button">Archive Notes</button>
        </div>
      </dialog>
    </>


  )
}