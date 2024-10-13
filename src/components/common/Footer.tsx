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
    { id: RoutePath.HomePage, label: "Tools", href: RoutePath.HomePage },
    { id: RoutePath.Contact, label: "Contact", href: RoutePath.Contact },
    { id: RoutePath.Prompts, label: "Prompts", href: RoutePath.Prompts },
    { id: RoutePath.Resources, label: "Resources", href: RoutePath.Resources },
    { id: RoutePath.Experts, label: "Experts", href: RoutePath.Experts },

  ];
  return (
    <footer className="text-black rounded-lg shadow bg-light-gray dark:text-white ">
      <div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
        <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
          <Link href="/">
            <h2 className="text-2xl font-semibold text-black whitespace-nowrap">
              Content Creation FYI
            </h2>
          </Link>
          <ul className="flex flex-wrap items-center justify-center space-x-4 text-sm font-medium text-black sm:mb-0">
            {footerItem.map((menu, index) => (
              <li key={menu.id}>
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-black sm:text-center">
          © {new Date().getFullYear()} Content Creation FYI. All Rights
          Reserved.
        </span>
      </div>
    </footer>
  );
}
