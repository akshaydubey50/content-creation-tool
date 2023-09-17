"use client";
import {
  Session,
  createClientComponentClient,
  createRouteHandlerClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";

interface MenuItem {
  id: number;
  label: string;
  href: string;
}
export default function Navbar() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session>();
  const storedValue = localStorage.getItem("isActiveMenu");
  const initialIsActiveMenu = storedValue ? parseInt(storedValue) || 0 : 0;

  const [isActiveMenu, setIsActiveMenu] = useState<number>(initialIsActiveMenu);

  const handleNavbarMenu = (index: number) => {
    setIsActiveMenu(index);
  };

  useEffect(() => {
    // console.log("isActiveMenu", isActiveMenu);
    localStorage.setItem("isActiveMenu", String(isActiveMenu));
  }, [isActiveMenu]);


  const memoizedIsUserLoggedIn = useCallback(isUserLoggedIn, [supabase.auth]);
  async function isUserLoggedIn() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      // console.log("session", session);
      setSession(session);
    }
    return session;
  }

  async function logout() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    // console.log("logout session", session);
    if (session) {
      await supabase.auth.signOut();
    }
  }

  useEffect(() => {
    if (!session) {
      memoizedIsUserLoggedIn();
    }
  }, [session, memoizedIsUserLoggedIn, isUserLoggedIn, logout]);

  const menuItem: MenuItem[] = [
    { id: 1, label: "All Program", href: "/" },
    { id: 2, label: "Contact", href: "/" },
    { id: 3, label: "Post a Program", href: "post-a-program" },
  ];

  const [isMenu, setIsMenu] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);


  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  function hamburgerHandler() {
    setIsMenu(true);
  }

  function crossHandler() {
    setIsMenu(false);
  }


  return (
    <>
      <nav className="bg-white z-30 relative shadow-md w-full px-5 xl:px-10">
        <div className="flex justify-between items-center py-4 lg:px-4 lg:py-6">
          <div>
            <Link href="/">
              <h2 className="text-Title-Large lg:text-Title-Larger font-bold">
                Content Creation
              </h2>
            </Link>
          </div>
          {/* menubar in large screen */}
          <ul className="hidden text-Title-Large lg:flex flex-1 flex-wrap justify-end font-semibold gap-x-8 text-black items-baseline">
            {menuItem.map((menu, index) => (
              <li
                key={menu.id}
                className={`px-6 py-2  text-black   rounded-full hover:bg-DarkOrange hover:text-white cursor-pointer
                ${isActiveMenu === index
                    ? "bg-DarkOrange text-white  "
                    : "text-black"
                  }`}
                onClick={() => handleNavbarMenu(index)}
              >
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
            {session && (
              <li
                className="outline-6  text-black  px-4 py-2 rounded-lg hover:text-white
               hover:outline hover:outline-2 hover:bg-[#FF8C00]"
              >
                <button onClick={logout}>Logout</button>
              </li>
            )}
            {!session && (
              <li className="bg-[#FF8C00] px-4 py-2 text-white rounded-lg hover:text-black hover:bg-white hover:outline hover:outline-2">
                <button onClick={togglePopup}>Login</button>
              </li>
            )}
          </ul>
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
      </nav>
      {/* Mobile View Sidebar */}
      <aside
        className={`fixed top-0 z-40 h-full w-screen bg-white text-black text-Title-Large transform transition-transform duration-500 overflow-hidden ${isMenu ? "translate-x-0" : "-translate-x-full"
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
                    togglePopup();
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
                <button onClick={logout}>Logout</button>
              </span>
            </li>
          )}
        </ul>
      </aside>
      {isPopupOpen && (
        <div className=" fixed inset-0 flex items-center justify-center z-10">
          {/* Fixed background overlay with slight blur */}
          <div
            onClick={togglePopup}
            className="fixed inset-0 bg-black opacity-40 backdrop-filter backdrop-blur-sm cursor-pointer"
          ></div>

          {/* Popup content */}
          <div className="bg-white p-8 md:w-2/5 lg:w-2/5 mt-12 rounded shadow-md z-20 relative">
            <Auth
              supabaseClient={supabase}
              providers={["google"]}
              redirectTo={`/auth/callback`}
              magicLink={true}
              appearance={{
                style: {
                  button: {
                    // background: "#FF8C00",
                    outline: "none",
                    border: "none",
                    // font
                  },
                  anchor: { color: "#FF8C00" },
                  // label: { color: "black" },
                  container: { width: "flex" },
                },
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#404040",
                      brandAccent: "#52525b",
                    },
                  },
                },
              }}
              theme="dark"
            />
            <button
              onClick={togglePopup}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 "
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
}
