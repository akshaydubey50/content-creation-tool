import React from 'react'
import Link from 'next/link'
import { FiArrowUpRight } from "react-icons/fi";


interface visiWebsite {
  url: string;
}
export default function VisitWebsite({ url }: visiWebsite) {
  return (
    <div className="hover:text-DarkOrange text-white ">
      <Link
        href={url}
        target="_blank"
        className=" flex gap-x-2 px-4 md:px-6  py-2 rounded-lg border border-DarkOrange hover:bg-white hover:text-DarkOrange text-cct-White font-semibold bg-DarkOrange items-center text-Title-Small "
      >
        <p>
          Visit Website
        </p>
        <p>
          <FiArrowUpRight className="text-2xl " />
        </p>
      </Link>
   </div>
  )
}
