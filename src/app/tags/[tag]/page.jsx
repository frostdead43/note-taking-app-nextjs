"use client"
import Link from "next/link";
import {use, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./tagDetail.css";
import "../globals.css"

export default function Page({ params }) {
  const unwrappedTagParams = use(params);
   const { tag } = unwrappedTagParams;

  const [tagDetail, setTagDetails] = useState(null);

  useEffect(() => {
    async function getTagData() {
      const { data } = await supabase.from("notes").select("*").eq("tags", tag); 
      setTagDetails(data);
      console.log(data);
    }
      getTagData();
  }, [tag]);
  
  console.log(tagDetail)

  return (
    <div className="tag-container">
      <h2>Notes Tagged: <span className="black">{tag}</span></h2>
      <p>All notes with the <span className="black">"{tag}"</span> tag are shown here.</p>
      {tagDetail?.map(x => (
      <Link key={x.title} href={`/notes/${x.id}`}>
          <div className="new-notes">
            <h3>{x?.title}</h3>
            <h5>{x?.tags}</h5>
          </div>
      </Link>

      ))}
    </div>
  );
}
