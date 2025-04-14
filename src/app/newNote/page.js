import Link from 'next/link'
import styles from './newNote.module.css'


export default function newNote() {
  return(
    <div className="container">
      <div className={styles["newnote-area"]}>
        <div className={styles["newnote-header"]}>
          <div>
            <Link href="/"><span>Go back</span></Link>
          </div>
          <div className={styles["flex"]}>
            <Link href="/"><span>Cancel</span></Link>
            <Link href="/"><span>Save Note</span></Link>
          </div>
        </div>
          <div className={styles["newnote-title"]}>
           <input type="text" placeholder="Enter a Title..." />
          </div>
        <div className={styles["note-input"]}>
          <img src="/images/tag-mini.svg"/>
          <h6 className={styles["h6"]}>Tags</h6>
          <input type="text" name='tags' required placeholder="Add tags separated by commas" />
        </div>
        <div className={styles["note-input"]}>
          <img src="/images/clock-icon.svg"/>
          <h6 className={styles["h6"]}>Last edited</h6>
          <input className={styles["asd"]} type="text" disabled  placeholder="Not yet saved" />
        </div>
      </div>

      <hr />

      <textarea className= {styles.textarea} name="notes" id="" required placeholder="Start typing your note here…"></textarea>
    </div>
  )
}