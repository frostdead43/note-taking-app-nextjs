"use client"
import { supabase } from "@/src/app/lib/supabaseClient";
import "./archiveDetail.css"
import Link from "next/link";
import { use, useEffect, useState, useRef } from "react";
import { redirect } from "next/navigation";



export default function Page({ params }) {
  const unwrappedArchiveParams = use(params);
  const { id } = unwrappedArchiveParams;

  const [archiveDetail, setArchiveDetail] = useState(null);
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);


  useEffect(() => {
    async function getArchiveData() {
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
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) {
      console.error(error)
    } else {
      redirect("/");
    }
  }

  async function handleArchive(id) {
    const { error } = await supabase.from('notes').update({ archived: false }).eq('id', id);

    if (error) {
      console.error('Arşive gönderme hatası:', error);
    } else {
      console.log('Not başarıyla arşivden çıkarıldı!');
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
              <img onClick={handleOpenModal} src="../images/delete-icon.svg" />
              <img onClick={handleOpenArchiveModal} src="../images/archive-icon.svg" />
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