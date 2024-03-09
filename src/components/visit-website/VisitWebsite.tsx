import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

interface visitWebsite {
  url: string;
}
export default function VisitWebsite({ url }: visitWebsite) {
  return (
    <Link
      href={url}
      target="_blank"
      className=" flex gap-x-2 px-4 md:px-6  py-2 rounded-full text-cct-White font-semibold bg-DarkOrange items-center text-Title-Small "
    >
      <p>Visit Website</p>
      <p>
        <FiArrowUpRight className="text-2xl text-white" />
      </p>
    </Link>
  );
}
