"use client";
import { use, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./detail.css";
import { redirect } from "next/navigation";
import Link from "next/link";


export default function Page({ params }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  const [noteDetails, setNoteDetails] = useState(null);
  const [edit, setEdit] = useState("");
  const [titleEdit,setTitleEdit] = useState("");


  useEffect(() => {
    async function getPostDetail() {
      const { data, error } = await supabase.from("notes").select("*").eq("id", id).single();
      if (error) {
        console.error(error);
      } else {
        setNoteDetails(data);
        setEdit(data.body); 
        setTitleEdit(data.title);
      }
    }

    getPostDetail();
  }, [id]);

  function handleChange(e) {
    setEdit(e.target.value);
   
  }

  function handleTitleChange(e) {
    setTitleEdit(e.target.value);
  }

  async function handleSave(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("notes").update({ title: titleEdit, body: edit}).eq("id", id).select();

    if (error) {
      console.error(error);
    } else {
      console.log(data);
      redirect("/");
    }
  }

  return (
    <form onSubmit={handleSave}>
      <div className="detail-container">
        <div className="menu-bar">
          <div>
           <Link href={"/"}><button type="button">Go Back</button></Link>
          </div>
          <div className="flex">
            <img src="../images/delete-icon.svg" />
            <img src="../images/archive-icon.svg" />
            <Link href={"/"}><button type="button">Cancel</button></Link>
            <button type="submit" className="save-btn">Save Note</button>
          </div>
        </div>
        <div className="body">
          <input className="title-input" type="text" name="title" value={titleEdit} onChange={handleTitleChange}></input>
          <div className="new-note-body">
            <div className="note-input">
              <img src="../images/tag-mini.svg" />
              <h6>Tags</h6>
              <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{noteDetails?.tags}</h6>
            </div>
            <div className="note-input">
              <img src="../images/clock-icon.svg" />
              <h6>Last edited</h6>
              <h6 style={{ color: "rgba(51, 92, 255, 1)" }}>{noteDetails?.created_at}</h6>
            </div>
          </div>
          <hr />
          <div className="asd">
            <textarea value={edit} onChange={handleChange}></textarea>
          </div>
        </div>
      </div>
    </form>
  );
}
