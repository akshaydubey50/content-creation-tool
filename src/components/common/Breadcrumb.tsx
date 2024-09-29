"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategoryData } from "@/redux/slice/category/categorySlice";
import { HomePage } from "@/constants/RoutePath";
import { ChevronRight, LucideHome } from "lucide-react";
import { clearSearchFilterList, setSearchQuery } from "@/redux/slice/search/searchSlice";

type BreadcrumbProps = {
  categories: string;
  currentPageTitle: string;
};

export default function Breadcrumb({
  categories,
  currentPageTitle,
}: BreadcrumbProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleNavigateToHome = () => {
    dispatch(setSearchQuery(""))
    dispatch(clearSearchFilterList());
    router.replace(HomePage);
  };

  // const handleCategorySelection = (selectedCategory: string) => {
  //   if (selectedCategory) {
  //     const formattedCategory = selectedCategory
  //       .toLowerCase()
  //       .trim()
  //       .replace(/\s+/g, "-");

  //     router.push(`${HomePage}/category/${formattedCategory}`);
  //     dispatch(setCategoryData([selectedCategory]));
  //   }
  // };

  const handlePageNavigation = (pageTitle: string) => {
    const formattedPage = pageTitle.toLowerCase().trim().replace(/\s+/g, "-");
    const newPath = pathname.includes("/category")
      ? `${pathname}/category/${formattedPage}`
      : pathname.includes("/category")
        ? `${pathname}/tools/${formattedPage}`
        : `${pathname}/${formattedPage}`;
    router.replace("/");
  };

  return (
    <nav className="font-medium flex flex-row items-center h-4">
      <span
        onClick={handleNavigateToHome}
        className="hover:text-DarkOrange hover:border-b-2 hover:border-DarkOrange cursor-pointer"
      >
        {" "}
        <LucideHome size={16} />
      </span>
      <ChevronRight className="h-4 w-4 text-gray-400" />

      <span
        onClick={() => handlePageNavigation(categories)}
        className="hover:text-DarkOrange hover:border-b-2 hover:border-DarkOrange cursor-pointer"
      >
        {/* {categories} */}
        Tools
      </span>
      <ChevronRight className="h-4 w-4 text-gray-400" />

      <span className="font-semibold">{currentPageTitle}</span>
    </nav>
  );
}
