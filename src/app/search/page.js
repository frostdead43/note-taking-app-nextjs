"use client";
import { useEffect, useState } from "react";
import "../globals.css"
import "./search.css"
import Link from "next/link";
import { filterNotesBySearch } from "../lib/filterNotes";
import { createClient } from "../utils/supabase/client";


export default function Search() {

  const [searchNotes, setSearchNotes] = useState([]);
  const [search, setSearch] = useState('');

  const filterSearch = filterNotesBySearch(searchNotes, search);

  useEffect(() => {
    async function getSearchData() {
      const supabase = await createClient();
      const { data } = await supabase.from('notes').select("*");
      setSearchNotes(data);
      console.log(data);
    }
    getSearchData();
  }, []);


  function handleSearch(e) {
    setSearch(e.target.value);
    console.log(e.target.value);
  }






  return (
    <>
      <div className="search-area">
        <h2>Search</h2>
        <input type="text" name="search" placeholder="Search..." onChange={handleSearch} />
        <p>
          All notes matching <span>{search}</span> are displayed below.
        </p>

        <div className="search">
          {filterSearch.length > 0 ? (
            filterSearch.map(x => (
              <Link key={x.id} href={`/notes/${x.id}`} >
                <div>
                  <h3>{x.title}</h3>
                  <h5>{x.tags}</h5>
                  <h6>{x.created_at}</h6>
                </div>
              </Link>
            ))
          ) : (
            <h5 className="notFound-text">No notes match your search. Try a different keyword or create a new note.</h5>
          )}
        </div>


      </div>
    </>
  )
}

