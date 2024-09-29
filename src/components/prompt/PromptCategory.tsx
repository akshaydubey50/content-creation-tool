import React from "react";
import { Checkbox } from "../ui/checkbox";

const PromptCategory = ({ categoryList }: { categoryList: any[] }) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <div className="space-y-4">
        {categoryList?.map((category, index) => (
          <div key={index} className="flex items-center">
            <Checkbox
              id={`category-${index}`}
              className="mr-1 gap-2 accent-orange-500
              border-black
              data-[state=checked]:bg-DarkOrange 
              data-[state=checked]:text-white  
              data-[state=checked]:border-DarkOrange
              "
            />
            <label
              htmlFor={`category-${index}`}
              className="ml-2 text-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
              peer-data-[state=checked]:font-semibold
              "
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default PromptCategory;
