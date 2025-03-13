import { useState, useEffect } from "react";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { useAuth } from "./store/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Admin() {
  const [accountHolders, setAccountHolders] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  function handleLogout() {
    setLoading(true);
    setTimeout(() => {
      logout();
      setLoading(false);
    }, 500);
  }
  // Fetch account holders from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/combined-users")
      .then((response) => {
        setAccountHolders(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError("Failed to fetch account holders.");
        setLoading(false);
      });
  }, []);

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
            Account Holders
          </h1>

          {loading ? (
            <p className="text-center text-yellow-400">
              Loading account holders...
            </p>
          ) : error ? (
            <p className="text-center text-red-400">{error}</p>
          ) : (
            <ul className="w-full p-4 mt-8 rounded-lg shadow-lg shadow-stone-700 bg-transparent">
              {accountHolders.map((account, index) => (
                <li
                  key={account.id || index}
                  className="w-full bg-stone-800 p-3 my-2 rounded-lg shadow-md border border-stone-700 hover:bg-stone-700"
                >
                  <button
                    onClick={() => {
                      setUser(account);
                      navigate("/admin-detail");
                    }}
                    className="text-stone-300 text-xl font-bold hover:text-yellow-300"
                  >
                    <div className="flex justify-between items-center">
                      {account.name}
                      <span className="text-stone-400 text-sm">
                        {account.email}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
