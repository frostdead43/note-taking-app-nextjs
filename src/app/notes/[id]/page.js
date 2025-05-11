"use client";
import { use, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./detail.css";
import { redirect } from "next/navigation";
import Link from "next/link";
import { NoteDetail } from "@/components/NoteDetail";


export default function Page({ params }) {
  const { id } = use(params);

  return <NoteDetail id={id} />;
}
