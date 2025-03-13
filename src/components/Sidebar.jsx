import { useState } from "react";
import Button from "./Button";
import { useAuth } from "./store/AuthContext";

export default function Sidebar({ user }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 500);
  }

  return (
    <aside className="fixed top-0 w-1/3 mt-8 px-8 py-16 h-full bg-stone-900 text-stone-50 md:w-72 rounded-r-xl flex flex-col justify-between">
      <div>
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-500">
          Welcome{" "}
          <span className="text-stone-300">{user ? user.name : "Guest"}!</span>
        </h2>

        <div>
          <Button>+ Add Project</Button>
        </div>

        <ul className="mt-8">
          {user.transactions
            .slice(-5)
            .reverse()
            .map((trs, index) => {
              return (
                <li
                  key={trs.id || index}
                  className="w-full bg-stone-800 p-3 my-2 rounded-lg shadow-md border border-stone-700 hover:bg-stone-700"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-stone-300 font-medium">
                      ₹{trs.amt}
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
  );
}
