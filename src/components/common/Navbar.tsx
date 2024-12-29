"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import * as RoutePath from "@/constants/RoutePath";
import { signOut, useSession } from "next-auth/react";

interface MenuItem {
  id: number | string;
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
    { id: RoutePath.HomePage, label: "Tools", href: RoutePath.HomePage },
    { id: RoutePath.Prompts, label: "Prompts", href: RoutePath.Prompts },
    // { id: RoutePath.Resources, label: "Resources", href: RoutePath.Resources },
    { id: RoutePath.Contact, label: "Contact", href: RoutePath.Contact },
    {
      id: RoutePath.SubmitTool,
      label: "Submit Tool",
      href: RoutePath.SubmitTool,
    },
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
      <header className="fixed z-10 w-full px-5 overflow-hidden bg-white shadow-md xl:px-10 ">
        <div className="flex items-center justify-between py-4 mx-auto max-w-7xl lg:px-2 lg:py-4">
          <div>
            <Link href="/">
              <div className="font-bold text-Heading-Small">Content Creation FYI</div>
            </Link>
          </div>
          {/* menubar in large screen */}
          <nav>
            <ul className="flex-wrap items-baseline justify-end flex-1 hidden gap-6 font-medium text-black text-Title-Medium lg:flex">
              {menuItem.map((menu, index) => (
                <li key={menu?.id}>
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
                    className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-DarkOrange hover:text-white"
                    onClick={handleSignout}
                  >
                    Logout
                  </button>
                </li>
              )}
              {!session && (
                <li>
                  <button
                    className="px-6 py-2 font-semibold text-black bg-gray-100 rounded-lg hover:shadow-2xl hover:shadow-gray-100 hover:bg-gray-200"
                    onClick={handleSignIn}
                  >
                    Login
                  </button>
                </li>
              )}

              {!session && (
                <li>
                  <button
                    className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-DarkOrange hover:text-white"
                    onClick={handleSignup}
                  >
                    Sign Up
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
        className={`fixed top-0 z-40 h-full w-screen px-3 bg-white text-black text-Title-Large transform transition-transform duration-500 overscroll-none ${
          isMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex p-3 my-2 ">
          <div className="font-bold text-Heading-Medium">Content Creation FYI</div>
          <button
            title="close"
            onClick={crossHandler}
            className="px-4 ml-auto outline-none"
          >
            <ImCross size={20} color="red" />
          </button>
        </div>
        <div>
          {menuItem.map((menu) => (
            
              <div key={menu?.id} className="flex items-center px-2 py-4 text-xl font-semibold border-b border-gray-200"
                onClick={() => {
                  console.log("menu", menu);
                  crossHandler();
                  router.push(menu?.href);
                }}
              >
                {menu.label}
              </div>
            
          ))}

          {!session && (
            <div className="grid items-center grid-cols-2 mt-6 font-semibold justify-items-center" >
              <div className="col-span-1 px-12 py-4 border rounded-full border-DarkOrange text-DarkOrange">
              <div className="flex items-center justify-end"
                onClick={() => {
                  crossHandler();
                  handleSignIn();
                }}
              >
                Login
              </div>
              </div>
              <div className="col-span-1 px-12 py-4 text-white rounded-full bg-DarkOrange ">
              <div className="flex items-center justify-center "
                onClick={() => {
                  crossHandler();
                  handleSignup();
                }}>
                Sign Up
              </div>
            </div>
            </div>
          )}
          {session && (
            <div className="flex justify-center mt-6 font-semibold">
            <button className="px-20 py-4 text-white rounded-full bg-DarkOrange"
              onClick={() => {
                crossHandler();
                handleSignout();
              }}
            >
              Logout
            </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
