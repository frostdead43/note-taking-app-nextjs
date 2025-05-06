"use client";
import { useEffect, useState } from "react";
import "./tags.css"
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function Tags() {

  const [searchTags,setSearchTags]= useState([]);
  const [tags,setTags] = useState("");

  useEffect(()=>{
    async function getTagsData() {
      const { data: tags } = await supabase.from('notes').select("tags");
      const tagsArray = tags.flatMap(note => note.tags); 
      const uniqueTags = [...new Set(tagsArray)]; 
      setSearchTags(uniqueTags);
      console.log(uniqueTags);
    }
    getTagsData();
  },[]);

  return(
    <>
    <div className="container">
      <h2>Tags</h2>
      {searchTags.map(tag=>(
        <Link key={tag.tags} href={`/tags/${tag}`}>
          <div className="tags-area">
            <img src="./images/tag-icon.svg"/>
            <div className="tag-name">
            <h6>{tag}</h6>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  )
}