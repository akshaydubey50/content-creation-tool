import React from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from "react-icons/fi";


interface visiWebsite{
    url:string;
}
export default function VisitWebsite({url}:visiWebsite) {
  return (
    <div className="flex rounded-full font-semibold bg-DarkOrange items-center text-Title-Small px-4 md:px-6  py-2 space-x-4">
    <Link
      href={url}
      target="_blank"
      className="flex-1"
    >
      Visit Website 
    </Link>
      <FiArrowUpRight size={24} color="white" />
    </div>
  )
}
