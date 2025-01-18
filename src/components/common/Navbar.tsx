"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import { GiHamburgerMenu } from "react-icons/gi";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import * as RoutePath from "@/constants/RoutePath";
import { signOut, useSession } from "next-auth/react";

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const menuItem: MenuItem[] = [
    { id: RoutePath.HomePage, label: "Tools", href: RoutePath.HomePage },
    { id: RoutePath.Prompts, label: "Prompts", href: RoutePath.Prompts },
    { id: RoutePath.Experts, label: "Experts", href: RoutePath.Experts },
    { id: RoutePath.Projects, label: "Projects", href: RoutePath.Projects },
    { id: RoutePath.SubmitTool, label: "Submit Tool", href: RoutePath.SubmitTool },
    { id: RoutePath.Contact, label: "Contact", href: RoutePath.Contact },
  ];

  const handleSignIn = () => router.push("/signin");
  const handleSignup = () => router.push("/signup");
  const handleSignout = () => signOut();

  const toggleMobileMenu = () => setIsMenuOpen(!isMenuOpen);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <>
      <header className={`w-full px-5 bg-white shadow-md xl:px-10 transition-all duration-500 
      // ${isSticky && 'fixed top-0 left-0 right-0 z-50' }
      `} >

        <div className={`flex items-center justify-between mx-auto max-w-7xl lg:px-2 ${isSticky ? 'py-4 duration-500 transition-all' : 'py-6'}`}>
          <div>
            <Link href="/">
              <div className="font-bold text-Heading-Small">Content Creation FYI</div>
            </Link>
          </div>
          {/* Desktop Menu */}
          <nav className="hidden lg:flex">
            <ul className="flex gap-6 font-medium text-black text-Title-Medium">
              {menuItem.map((menu) => (
                <li key={menu.id}>
                  <Link
                    target={menu.label === "Submit Tool" ? "_blank" : "_self"}
                    href={menu.href}
                    className={`hover:border-b-4 hover:border-DarkOrange cursor-pointer ${pathName === menu.href ? "border-b-4 border-DarkOrange" : ""
                      }`}
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden space-x-6 lg:flex">
            {session ? (
              <button
                className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-DarkOrange"
                onClick={handleSignout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="px-6 py-2 font-semibold text-black bg-gray-100 rounded-lg hover:bg-gray-200"
                  onClick={handleSignIn}
                >
                  Login
                </button>
                <button
                  className="px-6 py-2 font-semibold text-white bg-black rounded-lg hover:bg-DarkOrange"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="lg:hidden">
            <button onClick={toggleMobileMenu} className="outline-none">
              {isMenuOpen ? <ImCross size={20} color="red" /> : <GiHamburgerMenu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile View Sidebar */}
      <aside
        className={`fixed top-0 z-40 h-full w-screen bg-white text-black transform transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-between p-3 my-2">
          <div className="font-bold text-Heading-Medium">Content Creation FYI</div>
          <button onClick={toggleMobileMenu} className="outline-none">
            <ImCross size={20} color="red" />
          </button>
        </div>
        <nav className="px-3">
          {menuItem.map((menu) => (
            <div
              key={menu.id}
              className="py-4 text-xl font-semibold border-b border-gray-200"
              onClick={() => {
                toggleMobileMenu();
                router.push(menu.href);
              }}
            >
              {menu.label}
            </div>
          ))}
        </nav>

        {!session ? (
          <div className="grid grid-cols-2 gap-4 p-6 mt-6 font-semibold">
            <button
              className="col-span-1 px-12 py-4 border rounded-full border-DarkOrange text-DarkOrange"
              onClick={() => {
                toggleMobileMenu();
                handleSignIn();
              }}
            >
              Login
            </button>
            <button
              className="col-span-1 px-12 py-4 text-white rounded-full bg-DarkOrange"
              onClick={() => {
                toggleMobileMenu();
                handleSignup();
              }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <div className="flex justify-center p-6 mt-6 font-semibold">
            <button
              className="px-20 py-4 text-white rounded-full bg-DarkOrange"
              onClick={() => {
                toggleMobileMenu();
                handleSignout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}