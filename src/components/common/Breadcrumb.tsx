"use cilent";
import React from "react";

type HyperHead = { tag: string; title: string };

export default function Breadcrumb({ tag, title }: HyperHead) {
  return (
    <>
      <p className="  md:text-2xl font-semibold">
        Content Tools {">"} {tag} {">"} {title}
      </p>
    </>
  );
}

 

 

