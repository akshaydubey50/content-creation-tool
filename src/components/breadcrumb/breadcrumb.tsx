"use cilent";
import { Product } from "@/types/product";
import React from "react";

type HyperHead = { tag: string; title: string };

export default function BreadCrumb({ tag, title }: HyperHead) {
  return (
    <>
      <p className=" text-xl md:text-2xl font-semibold">
        Content Tools {">"} {tag} {">"} {title}
      </p>
    </>
  );
}
