"use client";
import { useRef } from "react";
import { handleArchive, handleDelete,handleRestore } from "@/src/app/lib/noteAction";


export function BtnGroupColumn({ noteId, setSelectedArea, noteColumnArea }) {
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);
  const restoreRef = useRef(null);

  return (
    <>
      <div className="btn-group-column-container">
        {noteColumnArea === "archive" ?  (
         <div className="btn-group-column " onClick={() => restoreRef.current.showModal()}>
          <img src="images/restore-icon.svg" alt="" />
          <h6>Restore Note</h6>
        </div> ):(
            <div className="btn-group-column " onClick={() => archiveRef.current.showModal()}>
          <img src="images/archive-icon.svg" alt="" />
          <h6>Archive Note</h6>
        </div>
        )
        }
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
      <dialog ref={restoreRef}  >
        <h3>Restore Note</h3>
        <p>Are you sure you want to restore this note? You can find it and archive it anytime.</p>
        <div className="modal-buttons">
          <button onClick={() => restoreRef.current.close()}>Cancel</button>
          <button onClick={() => { handleRestore(noteId); restoreRef.current.close(); setSelectedArea(null) }} style={{ background: "rgba(51, 92, 255, 1)" }} className="archive-modal-button">Restore Note</button>
        </div>
      </dialog>
    </>
  );
}
