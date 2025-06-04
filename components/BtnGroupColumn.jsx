import { useRef } from "react";
import { handleArchive, handleDelete, handleRestore } from "@/src/app/lib/noteAction";


export function BtnGroupColumn({ noteId, setSelectedArea, notes }) {
  const dialogRef = useRef(null);
  const archiveRef = useRef(null);
  const restoreRef = useRef(null);
  const selectedNote = notes.find(note => note.id === noteId);

  return (
    <>
      <div className="btn-group-column-container">
        {selectedNote?.archived ? (
          <div className="btn-group-column " onClick={() => restoreRef.current.showModal()}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.09026 6.16962C3.4082 6.03519 3.7749 6.18396 3.90932 6.50189L5.00629 9.09638L7.58326 8.0068C7.9012 7.87239 8.2679 8.02114 8.40233 8.33904C8.53675 8.65704 8.388 9.02371 8.07005 9.15813L4.91741 10.491C4.59948 10.6255 4.23278 10.4767 4.09836 10.1588L2.758 6.98867C2.62357 6.67074 2.77234 6.30404 3.09026 6.16962Z" fill="#0E121B" />
              <path fillRule="evenodd" clipRule="evenodd" d="M10.7624 4.71991C7.89009 4.71991 5.55539 7.008 5.4832 9.85328C5.47445 10.1983 5.18762 10.4709 4.84255 10.4622C4.49749 10.4534 4.22485 10.1666 4.2336 9.82153C4.32299 6.29821 7.21239 3.46991 10.7624 3.46991C14.366 3.46991 17.2915 6.39544 17.2915 9.99894C17.2915 13.6097 14.3655 16.528 10.7624 16.528C8.52867 16.528 6.56351 15.41 5.38176 13.708C5.18489 13.4244 5.25516 13.035 5.53869 12.8382C5.82223 12.6413 6.21167 12.7115 6.40854 12.9951C7.36759 14.3764 8.957 15.278 10.7624 15.278C13.6761 15.278 16.0415 12.9184 16.0415 9.99894C16.0415 7.0858 13.6756 4.71991 10.7624 4.71991Z" fill="#0E121B" />
            </svg>
            <h6>Restore Note</h6>
          </div>) : (
          <div className="btn-group-column " onClick={() => archiveRef.current.showModal()}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.5 7.78216V16.2169C21.5 19.165 19.4188 21 16.4736 21H8.52638C5.58119 21 3.5 19.165 3.5 16.2159V7.78216C3.5 4.83405 5.58119 3 8.52638 3H16.4736C19.4188 3 21.5 4.84281 21.5 7.78216Z" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15.5 14L12.4982 17L9.5 14" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.498 17V10" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21.4336 7H3.55859" stroke="#525866" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            <h6>Archive Note</h6>
          </div>
        )
        }
        <div className="btn-group-column" onClick={() => dialogRef.current.showModal()}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.3767 3.10322L13.0586 4.53105H15.2581C15.9343 4.53105 16.4826 5.05735 16.4826 5.70658V6.57714C16.4826 7.02103 16.1077 7.38087 15.6454 7.38087H4.17056C3.70818 7.38087 3.33334 7.02103 3.33334 6.57714V5.70658C3.33334 5.05735 3.88158 4.53105 4.55787 4.53105H6.75739L7.43922 3.10322C7.6438 2.67474 8.0898 2.40002 8.5808 2.40002H11.2351C11.7261 2.40002 12.1721 2.67474 12.3767 3.10322Z" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.2 7.44061V14.3892C15.2 15.7209 14.0895 16.8004 12.7195 16.8004H7.09717C5.72725 16.8004 4.6167 15.7209 4.6167 14.3892V7.44061" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.49936 10.2531V13.8598M11.3164 10.2531V13.8598" stroke="#0E121B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
