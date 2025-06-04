"use client";
import { useContext, useEffect, useState } from "react";
import "./tags.css"
import Link from "next/link";
import { ScreenSize } from "../page";
import { createClient } from "../utils/supabase/client";


export default function Tags({ setSelectedArea, takeTagsName, notes }) {
  const screenSize = useContext(ScreenSize);
  const [searchTags, setSearchTags] = useState([]);
  const [tags, setTags] = useState("");

  useEffect(() => {
    async function getTagsData() {
      const supabase = await createClient();
      const { data: tags } = await supabase.from('notes').select("tags");
      if (notes?.length === 0) return;
      const tagsArray = tags.flatMap(note => note.tags);
      const uniqueTags = [...new Set(tagsArray)];
      setSearchTags(uniqueTags);
      console.log(uniqueTags);
    }
    getTagsData();
  }, [notes]);

  return (
    <>
      <div className="tags-detail-container">
        <h2 className={screenSize > 768 ? "tags-title" : ""}>Tags</h2>
        {searchTags.map(tag => (
          <Link key={tag} href={screenSize > 768 ? `#` : `/tags/${tag}`} className="tags-link" onClick={() => { takeTagsName(tag); setSelectedArea(null) }}>
            <div className={screenSize > 768 ? "tags" : "tags-area"}  >
              <img src="./images/tag-icon.svg" />
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