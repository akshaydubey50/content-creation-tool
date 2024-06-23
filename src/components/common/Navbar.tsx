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
import {
  error,
  isUserAuthenticated,
  isUserLoggedInSlice,
} from "@/lib/slice/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useVisibleItemContextData } from "@/lib/visibleItemContext";
import { usePathname } from "next/navigation";
import * as RoutePath from "@/constants/RoutePath";
import { Popover } from "@headlessui/react";
interface MenuItem {
  id: number;
  label: string;
  href: string;
}
export default function Navbar() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<Session>();
  const [isActiveMenu, setIsActiveMenu] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const { isUserAuthenticated, error, userSession } = useSelector(
    (store: RootState) => store.user
  );

  const pathName = usePathname();
  const { showLoginForm, setShowLoginForm } = useVisibleItemContextData();

  useEffect(() => {
    dispatch(isUserLoggedInSlice());
    localStorage.setItem("isActiveMenu", String(isActiveMenu));
  }, [isActiveMenu, dispatch]);

  const memoizedIsUserLoggedIn = useCallback(isUserLoggedIn, [supabase.auth]);
  async function isUserLoggedIn() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setSession(session);
    }
    return session;
  }

  async function logout() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      await supabase.auth.signOut();
    }
  }

  useEffect(() => {
    if (!session) {
      memoizedIsUserLoggedIn();
    }
  }, [session, isUserLoggedIn, logout]);

  const menuItem: MenuItem[] = [
    { id: 1, label: "All Program", href: RoutePath.HomePage },
    { id: 2, label: "Contact", href: RoutePath.Contact },
    { id: 3, label: "Post a Program", href: RoutePath.PostProgram },
  ];

  const [isMenu, setIsMenu] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleNavbarMenu = (index: number) => {
    setIsActiveMenu(index);
  };

  const togglePopup = () => {
    setShowLoginForm(!showLoginForm);
  };

  function hamburgerHandler() {
    setIsMenu(true);
  }

  function crossHandler() {
    setIsMenu(false);
  }

  return (
    <>
      <header className="bg-white fixed z-10 shadow-md w-full px-5 xl:px-10 ">

        <div className="flex  max-w-7xl  mx-auto justify-between items-center  py-4 lg:px-2 lg:py-4">
          <div>
            <Link href="/">
              <h2 className="text-Title-Large  font-bold">
                Content Creation
              </h2>
            </Link>
          </div>
          {/* menubar in large screen */}
          <nav>
            <ul className="hidden text-Title-Medium lg:flex flex-1 flex-wrap justify-end font-medium gap-6  text-black items-baseline">
              {menuItem.map((menu, index) => (
                <li
                  key={menu.id}
                >
                  <Link className={`  text-black    hover:border-b-4 hover:border-DarkOrange  cursor-pointer
                ${pathName === menu.href
                      ? "border-b-4 border-DarkOrange text-black  "
                      : "text-black"
                    }`} href={menu.href} onClick={() => handleNavbarMenu(index)}>{menu.label}</Link>
                </li>
              ))}

            </ul>
          </nav>

          <div className="hidden lg:block">
            <ul className="flex space-x-6">
              {session && (
                <li>
                  <button className="text-white font-semibold bg-black  px-6 py-2 hover:bg-DarkOrange hover:text-white   rounded-lg"
                    onClick={logout}>Logout</button>
                </li>
              )}
              {!session && (
                <li>
                  <button className="text-black font-semibold  px-6 py-2  rounded-full bg-gray-100 hover:shadow-2xl hover:shadow-gray-100  hover:bg-gray-200" onClick={togglePopup}>Login</button>
                </li>
              )}

              <li>
                <button className="text-white font-semibold bg-black  px-6 py-2 hover:bg-DarkOrange hover:text-white   rounded-lg  " onClick={togglePopup}>Sign Up</button>
              </li>
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
        className={`fixed top-0 z-40 h-full w-screen bg-white text-black text-Title-Large transform transition-transform duration-500 overscroll-none ${isMenu ? "translate-x-0" : "-translate-x-full"
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
      {showLoginForm && (
        <div className=" fixed inset-0 flex items-center justify-center z-10">
          {/* Fixed background overlay with slight blur */}
          <div
            onClick={togglePopup}
            className="fixed inset-0 bg-black opacity-40 backdrop-filter backdrop-blur-sm cursor-pointer"
          ></div>

          {/* Popup content */}
          <div className="bg-light-gray p-8 md:w-2/5 lg:w-2/5 mt-12 rounded-3xl shadow-md z-20 relative max-w-lg">
            <Auth
              supabaseClient={supabase}
              providers={[]}
              redirectTo={`/auth/callback`}
              magicLink={true}
              appearance={{
                style: {
                  button: {
                    background: "#FF8C00",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
                  anchor: {
                    color: "#FF8C00",
                    fontSize: "1rem",
                    textDecorationLine: "none",
                    fontWeight: 600,
                  },
                  label: {
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  },
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
              theme="light"
            />
            <button
              onClick={togglePopup}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 text-3xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}


    </>
  );
}