"use client";

import Link from 'next/link'
import styles from './newNote.css'
import { createNote } from '../action'
import { useActionState } from 'react'
import WideColumnFooter from '@/components/WideColumnFooter';


export default function NewNote({ setSelectedArea, isMobile }) {
  const [state, formAction, isPending] = useActionState(createNote, false);

  const today = new Date().toISOString().split("T")[0];



  return (
    <form action={formAction}>
      <div className="container">
        <div className="newnote-area">
          <div className="newnote-header">
            <div>
              {!isMobile && <Link href="/"><span>Go back</span></Link>}
            </div>
            <div className="flex">
              {!isMobile && <Link href="/"><span>Cancel</span></Link>}
              {!isMobile && <button type='submit'> Save Note </button>}
            </div>
          </div>
          <div className="newnote-title">
            <input required type="text" name='title' placeholder="Enter a Title..." />
          </div>
          <div className="note-input">
            <img src="/images/tag-mini.svg" />
            <h6 className="h6">Tags</h6>
            <input type="text" name='tags' required placeholder="Add tags separated by commas" />
          </div>
          <div className="note-input">
            <img src="/images/clock-icon.svg" />
            <h6 className="h6">Last edited</h6>
            <input className="asd" type="text" value={today} name='created_at' readOnly placeholder="Not yet saved" />
          </div>
        </div>

        <hr />

        <textarea className="note-textarea" name="body" required placeholder="Start typing your note here…"></textarea>
        {isMobile && <WideColumnFooter setSelectedArea={setSelectedArea} />}
      </div>
    </form>
  )
}