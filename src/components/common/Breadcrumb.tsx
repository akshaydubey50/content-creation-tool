"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@/redux/slice/category/category.slice";
import { HomePage } from "@/constants/RoutePath";
import { ChevronRight, LucideHome } from "lucide-react";
import { capitalizeWords } from "@/helper/helper";

type BreadcrumbProps = {
  categories: string;
  currentPageTitle: string;
  breadcrumbType: "tools" | "prompt"; // New prop to differentiate types
};

export default function Breadcrumb({
  categories,
  currentPageTitle,
  breadcrumbType, // Use this to check the breadcrumb type
}: BreadcrumbProps) {
  const router = useRouter();
  // const pathname = usePathname();
  const dispatch = useDispatch();

  const handleNavigateToHome = () => {
    router.replace(`/${breadcrumbType}`);
  };

  // const handleCategorySelection = (selectedCategory: string) => {
  //   if (selectedCategory) {
  //     const formattedCategory = selectedCategory
  //       .toLowerCase()
  //       .trim()
  //       .replace(/\s+/g, "-");

  //     router.push(`${HomePage}/category/${formattedCategory}`);
  //     dispatch(setCategoryData(selectedCategory));
  //   }
  // };


  // const handlePageNavigation = (pageTitle: string) => {
  //     const formattedPage = pageTitle.toLowerCase().trim().replace(/\s+/g, "-");
  //     const newPath = pathname.includes("/category")
  //       ? `${pathname}/category/${formattedPage}`
  //       : pathname.includes("/tools")
  //         ? `${pathname}/tools/${formattedPage}`
  //         : `${pathname}/${formattedPage}`;

  //     router.replace(newPath);
  // };

  return (
    <nav className="flex flex-row items-center h-4 font-medium">
      <span
        onClick={handleNavigateToHome}
        className="cursor-pointer hover:text-DarkOrange hover:border-b-2 hover:border-DarkOrange"
      >
        <LucideHome size={16} />
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400" />

      {/* Conditionally render category or tool */}
      {breadcrumbType === "tools" ? (
        <span className="cursor-pointer hover:text-DarkOrange hover:border-b-2 hover:border-DarkOrange"
          onClick={handleNavigateToHome}
        >
          Tools
        </span>
      ) : (
        <span
            onClick={handleNavigateToHome}
          className="cursor-pointer hover:text-DarkOrange hover:border-b-2 hover:border-DarkOrange"
        >
          {capitalizeWords(categories)}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-gray-400" />

      <span className="font-semibold">
        {capitalizeWords(currentPageTitle?.replaceAll("-", " "))}
      </span>
    </nav>
  );
}
