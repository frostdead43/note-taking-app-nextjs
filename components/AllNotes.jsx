
import Link from "next/link";

export default function AllNotes({ notes, screenSize, takeDetail }) {
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
