"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPopup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPopupOpen, setPopupOpen] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [user, setUser] = useState("");

  const handleSignIn = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    /* setUser(user); */
    console.log("data", user);
    console.log("error", error);
    if (user) {
      router.replace("/");
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    console.log("data", user);
    console.log("error", error);
    console.log("err desc", error);
  };
  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      console.log("sign out error", error);
    }
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
    }
    if (data.session) {
      console.log(data.user);
    }
  }

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <button
        onClick={togglePopup}
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Login
      </button>
      <button
        onClick={signOut}
        className="px-4 ml-4 py-2 text-white bg-blue-500 rounded"
      >
        signOut
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          {/* Fixed background overlay with slight blur */}
          <div
            onClick={togglePopup}
            className="fixed inset-0 bg-black opacity-40 backdrop-filter backdrop-blur-sm cursor-pointer"
          ></div>

          {/* Popup content */}
          <div className="bg-white p-8 rounded shadow-md z-20 relative">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            {/* <form onSubmit={signInWithEmail}> */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              /*  type="submit" */
              onClick={handleSignIn}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded"
            >
              Login
            </button>
            <button
              /*  type="submit" */
              onClick={handleSignUp}
              className="w-full mt-4 px-4 py-2 text-white bg-blue-500 rounded"
            >
              Sign Up
            </button>
            {/*  </form> */}
            <button
              onClick={togglePopup}
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-700"
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
