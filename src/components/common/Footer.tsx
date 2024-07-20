import React from "react";

export default function Footer() {
  return (
    <footer className="bg-light-gray rounded-lg shadow dark:text-white text-black bottom-0 ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-black self-center text-2xl font-semibold whitespace-nowrap">
            Content Creation
          </span>
          {/* </a> */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-black">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-black">
          © {new Date().getFullYear()} Content Tool . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
