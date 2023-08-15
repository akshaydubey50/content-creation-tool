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

export default function Navbar() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session>();
  const memoizedIsUserLoggedIn = useCallback(isUserLoggedIn, [supabase.auth]);
  async function isUserLoggedIn() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      console.log("session", session);
      setSession(session);
    }
    return session;
  }

  async function logout() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    console.log("logout session", session);
    if (session) {
      await supabase.auth.signOut();
    }
  }

  useEffect(() => {
    if (!session) {
      memoizedIsUserLoggedIn();
    }
  }, [session, memoizedIsUserLoggedIn]);

  const menuItem = [
    { id: 1, label: "All Program", href: "/" },
    { id: 2, label: "Category", href: "/" },
    { id: 3, label: "Contact", href: "/" },
    // { id: 4, label: "Login", href: "/" }
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
      <nav className="bg-white z-30 relative shadow-md w-full px-5 lg:px-10">
        <div className="flex justify-between py-4 lg:px-4 lg:py-6">
          <div>
            <Link href="/">
              <h2 className="text-Title-Large lg:text-Title-Larger font-bold">
                Content Creation
              </h2>
            </Link>
          </div>
          {/* menubar in large screen */}
          <ul className="hidden text-Title-Large lg:flex flex-1 flex-wrap justify-end font-semibold gap-x-10">
            {menuItem.map((menu) => (
              <li key={menu.id}>
                <Link href={menu.href}>{menu.label}</Link>
              </li>
            ))}
            {!session && (
              <li>
                <span className="px-6 py-2 text-white rounded-full bg-DarkOrange">
                  <button onClick={togglePopup}>Login</button>
                </span>
              </li>
            )}
            {session && (
              <li>
                <span className="px-6 py-2 text-white rounded-full bg-DarkOrange">
                  <button onClick={logout}>Logout</button>
                </span>
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
        className={`fixed top-0 z-40 h-full w-screen bg-white text-black text-Title-Large transform transition-transform duration-500 overflow-hidden ${
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
                <button onClick={togglePopup}>Login</button>
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
    </>
  );
}
