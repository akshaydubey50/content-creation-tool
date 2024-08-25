"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { usePathname, useRouter } from "next/navigation";
import * as RoutePath from "@/constants/RoutePath";
import { signOut, useSession } from "next-auth/react";
interface MenuItem {
  id: number| string;
  label: string;
  href: string;
}
export default function Navbar() {
  const [isActiveMenu, setIsActiveMenu] = useState(0);
  const dispatch: AppDispatch = useDispatch();

  const pathName = usePathname();

  useEffect(() => {
    localStorage.setItem("isActiveMenu", String(isActiveMenu));
  }, [isActiveMenu, dispatch]);

  const menuItem: MenuItem[] = [
    { id: RoutePath.HomePage, label: "All Tools", href: RoutePath.HomePage },
    { id: RoutePath.Contact, label: "Contact", href: RoutePath.Contact },
    { id: RoutePath.About_US, label: "About Us", href: RoutePath.About_US },
    { id: RoutePath.SubmitTool, label: "Submit Tool", href: RoutePath.SubmitTool },
  ];

  const [isMenu, setIsMenu] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();

  const handleNavbarMenu = (index: number) => {
    setIsActiveMenu(index);
  };

  function hamburgerHandler() {
    setIsMenu(true);
  }

  function crossHandler() {
    setIsMenu(false);
  }

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  const handleSignout = () => {
    signOut();
  };

  return (
    <>
      <header className="bg-white fixed z-10 shadow-md w-full overflow-hidden px-5 xl:px-10  ">
        <div className="flex  max-w-7xl  mx-auto justify-between items-center  py-4 lg:px-2 lg:py-4">
          <div>
            <Link href="/">
              <h2 className="text-Title-Large  font-bold">Content Creation</h2>
            </Link>
          </div>
          {/* menubar in large screen */}
          <nav>
            <ul className="hidden text-Title-Medium lg:flex flex-1 flex-wrap justify-end font-medium gap-6  text-black items-baseline">
              {menuItem.map((menu, index) => (
                <li key={menu.id}>
                  <Link
                    target={menu?.label == "Submit Tool" ? "_blank" : "_self"}
                    className={`  text-black    hover:border-b-4 hover:border-DarkOrange  cursor-pointer
                ${
                  pathName === menu.href
                    ? "border-b-4 border-DarkOrange text-black  "
                    : "text-black"
                }`}
                    href={menu.href}
                    onClick={() => handleNavbarMenu(index)}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ul className="flex space-x-6">
              {session && (
                <li>
                  <button
                    className="text-white font-semibold bg-black  px-6 py-2 hover:bg-DarkOrange hover:text-white   rounded-lg"
                    onClick={handleSignout}
                  >
                    Logout
                  </button>
                </li>
              )}
              {!session && (
                <li>
                  <button
                    className="text-black font-semibold  px-6 py-2  rounded-lg  bg-gray-100 hover:shadow-2xl hover:shadow-gray-100  hover:bg-gray-200"
                    onClick={handleSignIn}
                  >
                    Login
                  </button>
                </li>
              )}

              {!session && (
                <li>
                  <button
                    className="text-white font-semibold bg-black  px-6 py-2  hover:bg-DarkOrange hover:text-white   rounded-lg"
                    onClick={handleSignup}
                  >
                    Sign Up for $0
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="block lg:hidden">
            <button
              title="menu"
              onClick={hamburgerHandler}
              className="outline-none"
            >
              <GiHamburgerMenu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile View Sidebar */}
      <aside
        className={`fixed top-0 z-40 h-full w-screen bg-white text-black text-Title-Large transform transition-transform duration-500 overscroll-none ${
          isMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3 flex my-2">
          <h2 className="text-Title-Larger font-bold">Content Creation</h2>
          <button
            title="close"
            onClick={crossHandler}
            className="outline-none ml-auto px-4"
          >
            <ImCross size={20} color="red" />
          </button>
        </div>
        <ul>
          {menuItem.map((menu) => (
            <li key={menu.id} className="py-3 px-3 font-medium">
              <Link
                href={menu.href}
                className="px-4 border-l-4 border-DarkOrange border-solid"
              >
                {menu.label}
              </Link>
            </li>
          ))}

          {!session && (
            <li className="py-3 px-3 font-medium">
              <span className="px-4 border-l-4 border-DarkOrange border-solid">
                <button
                  onClick={() => {
                    crossHandler();
                    handleSignIn();
                  }}
                >
                  Login
                </button>
              </span>
            </li>
          )}
          {session && (
            <li className="py-3 px-3 font-medium">
              <span className="px-4 border-l-4 border-DarkOrange border-solid">
                <button onClick={handleSignout}>Logout</button>
              </span>
            </li>
          )}
        </ul>
      </aside>
    </>
  );
}
