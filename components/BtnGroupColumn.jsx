"use client";
import { useRef } from "react";
import { handleArchive, handleDelete } from "@/src/app/lib/noteAction";


export function BtnGroupColumn({ noteId, setSelectedArea }) {
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);

  return (
    <>
      <div className="btn-group-column-container">
        <div className="btn-group-column " onClick={() => archiveRef.current.showModal()}>
          <img src="images/archive-icon.svg" alt="" />
          <h6>Archive Note</h6>
        </div>
        <div className="btn-group-column" onClick={() => dialogRef.current.showModal()}>
          <img src="images/delete-icon.svg" alt="" />
          <h6>Delete Note</h6>
        </div>
      </div>
      <dialog ref={dialogRef} >
        <h3>Delete Note</h3>
        <p>Are you sure you want to permanently delete this note? This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={() => dialogRef.current.close()}>Cancel</button>
          <button onClick={() => { handleDelete(noteId); dialogRef.current.close(); setSelectedArea(null) }}>Delete Note</button>
        </div>
      </dialog>
      <dialog ref={archiveRef}  >
        <h3>Archive Note</h3>
        <p>Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.</p>
        <div className="modal-buttons">
          <button onClick={() => archiveRef.current.close()}>Cancel</button>
          <button onClick={() => { handleArchive(noteId); archiveRef.current.close(); setSelectedArea(null) }} style={{ background: "rgba(51, 92, 255, 1)" }} className="archive-modal-button">Archive Notes</button>
        </div>
      </dialog>
    </>
  );
}
