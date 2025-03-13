import { useState, useEffect } from "react";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { useAuth } from "./store/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDetail() {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 500);
  }
  console.log(user);
  return (
    <main className="h-screen mb-8 flex gap-8">
      <aside className="fixed top-0 w-1/3 mt-8 px-8 py-16 h-full bg-stone-900 text-stone-50 md:w-72 rounded-r-xl flex flex-col justify-between">
        <div className="">
          <h2 className="mb-8 font-bold text-center uppercase md:text-xl text-stone-200">
            Welcome ADMIN!
          </h2>
        </div>
        <button
          onClick={handleLogout}
          className={`mt-8 py-3 px-6 w-full font-bold rounded-lg transition duration-300 shadow-lg ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 0116 0H4z"
                ></path>
              </svg>
              Logging out...
            </div>
          ) : (
            "Log Out"
          )}
        </button>
      </aside>
      <div className="flex flex-col w-full align-items-center">
        <div className="w-1/3 mx-auto pb-8">
          <h1 className="text-3xl font-bold text-stone-600 my-4 text-center">
            Transaction History
          </h1>
          <ul className="w-full p-4 mt-8 rounded-lg shadow-lg shadow-stone-700 bg-transparent">
            {user.transactions
              .slice()
              .reverse()
              .map((trs, index) => {
                return (
                  <li
                    key={trs.id || index}
                    className="w-full bg-stone-800 p-3 my-2 rounded-lg shadow-md border border-stone-700 hover:bg-stone-700"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-stone-300 ">
                        <span className="text-xl font-bold">₹{trs.amt} </span>
                        <span
                          className={`ml-2 ${
                            trs.balance >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          ({trs.balance})
                        </span>
                      </span>
                      <span
                        className={`capitalize font-semibold text-sm ${
                          trs.amt === 0
                            ? "text-yellow-400"
                            : trs.type === "deposit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {trs.amt === 0 ? "Opening Balance" : trs.type}
                      </span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </main>
  );
}
