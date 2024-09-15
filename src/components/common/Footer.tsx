import React from "react";
import * as RoutePath from "@/constants/RoutePath";
import Link from "next/link";

interface FooterItem {
  id: number | string;
  label: string;
  href: string;
}

export default function Footer() {
  const footerItem: FooterItem[] = [
    { id: RoutePath.HomePage, label: "All Tools", href: RoutePath.HomePage },
    { id: RoutePath.Contact, label: "Contact", href: RoutePath.Contact },
    { id: RoutePath.Prompt, label: "Prompt", href: RoutePath.Prompt },
    { id: RoutePath.Resources, label: "Resources", href: RoutePath.Resources },
  ];
  return (
    <footer className="bg-light-gray rounded-lg shadow dark:text-white text-black  ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between  space-y-3 md:space-y-0">
          <Link href="/">
            <h2 className="text-black  text-2xl font-semibold whitespace-nowrap">
              Content Creation FYI
            </h2>
          </Link>
          <ul className="flex space-x-4  items-center  text-sm font-medium  sm:mb-0 text-black">
            {footerItem.map((menu, index) => (
              <li key={menu.id}>
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-black">
          © {new Date().getFullYear()} Content Creation FYI. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
}
