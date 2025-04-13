"use client";
import { useState } from "react";
import styles from "./page.module.css"


export default function Home() {
const [isEmpty,setIsEmpty] = useState(true);

  return(
   <div className ="container">
    <h2>All Notes</h2>
    {isEmpty && (
      <div className={styles["empty-area"]}>
        <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
      </div>
    )}
    <img className={styles.plus} src="/images/plus.svg"/>
   </div>
  )
}