"use cilent";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@/redux/slice/category/categorySlice";

type HyperHead = { tag: string; title: string };

export default function Breadcrumb({ tag, title }: HyperHead) {
  const router = useRouter();

  const handleGoBack = () => {
    router.push(`/`);
  };

  const dispatch = useDispatch();

  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let formatedCategory = selectedOption[0]
        ?.toLowerCase()?.trim()?.replace(/\s/g, "-");
      router.push(`/category/${formatedCategory}`);
      dispatch(setCategoryData(selectedOption));
    }
  };
  return (
    <>
      <p className="font-medium ">
        <span className="cursor-pointer">
        <span
          
          onClick={handleGoBack}
          className="hover:border-b-2 hover:border-DarkOrange"
          >
          Content Tools
        </span>
        {" > "}
        <span
          onClick={() => selectedCategory(tag)}
          className="hover:border-b-2 hover:border-DarkOrange"
          >
          {tag}
        </span>
        {" > "} <span className="font-semibold">{title}</span>
          </span>
      </p>
    </>
  );
}
