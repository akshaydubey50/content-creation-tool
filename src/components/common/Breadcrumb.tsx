"use cilent";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@/lib/slice/categorySlice"

type HyperHead = { tag: string; title: string };

export default function Breadcrumb({ tag, title }: HyperHead) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  }; 

  const dispatch =useDispatch();
  
  
  const selectedCategory = (selectedOption: any) => {
    if (selectedOption) {
      let formatedCategory = selectedOption[0]?.toLowerCase().replace(/\s/g, "-");
      router.push(`/category/${formatedCategory}`);
      dispatch(setCategoryData(selectedOption));
    }
  };
  return (
    <>
      <p className=" md:text-xl font-medium pt-8 cursor-pointer">
        <span onClick={handleGoBack}>
        Content Tools
        </span>
          {" > "} 
         <span onClick={()=> selectedCategory(tag)}>
         {tag} 
         </span>
         {" > "} <span className="font-bold">{title}</span>
      </p>
    </>
  );
}

 

 

