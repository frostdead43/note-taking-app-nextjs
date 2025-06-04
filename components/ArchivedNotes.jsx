
import Link from "next/link";

export default function ArchivedNotes({ notes, screenSize, takeDetail }) {
  return (
    <>
      <p className="archive-column-text">All your archived notes are stored here. You can restore or delete them anytime.</p>
      {notes.length === 0 && (
        <div className="empty-area">
          <p>No notes have been archived yet. Move notes here for safekeeping, or <span>create a new note.</span></p>
        </div>
      )}
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
