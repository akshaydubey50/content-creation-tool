import React from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from "react-icons/fi";


interface visiWebsite{
    url:string;
}
export default function VisitWebsite({url}:visiWebsite) {
  return (
    <div className="flex rounded-full font-semibold bg-DarkOrange px-10 py-3 space-x-5">
    <Link
      href={url}
      target="_blank"
      className=""
    >
      Visit Website 
    </Link>
      <FiArrowUpRight size={24} color="white" />
    </div>
  )
}
