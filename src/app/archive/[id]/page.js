"use client"
import { supabase } from "@/src/app/lib/supabaseClient";
import "./archiveDetail.css"
import Link from "next/link";
import { use,useEffect, useState } from "react";


export default function Page({params}) {
  const unwrappedArchiveParams = use(params);
  const { id } = unwrappedArchiveParams;

  const [archiveDetail,setArchiveDetail] = useState(null);

  useEffect(() => {
    async function getArchiveData(){
      const { data } = await supabase.from("notes").select("*").eq("id", id).single();
      setArchiveDetail(data);
      console.log(data);
    }
    getArchiveData();
  },[])


  return(
    <>
    <h2>deneme detay</h2>
    <h6>{archiveDetail?.title}</h6>
    </>
    

  )
}