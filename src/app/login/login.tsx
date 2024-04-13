"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const LoginPopup = ({ isPopupOpenn }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState("");

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>
      {
        <button
          onClick={togglePopup}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Login
        </button>
      }
      {/*  <button
        onClick={signOut}
        className="px-4 ml-4 py-2 text-white bg-blue-500 rounded"
      >
        signOut
      </button> */}

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
                  message: { color: "black" },
                  anchor: { color: "black" },
                  label: { color: "black" },
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
};

export default LoginPopup;
