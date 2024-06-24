import React from "react";

export default function Login() {
  return (
    <>
      <div
        id="loginPopup"
        className="fixed inset-0 flex items-center justify-center z-10 "
      >
        <div className="fixed inset-0 bg-black opacity-50"></div>

        <div className="bg-white p-8 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
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
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-500 rounded"
            >
              Login
            </button>
          </form>
          <button
            id="closeBtn"
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-700"
          >
            &times;
          </button>
        </div>
      </div>
    </>
  );
}
