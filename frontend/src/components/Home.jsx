import { useState } from "react";
import Button from "./Button";
import Sidebar from "./Sidebar";
import { useAuth } from "./store/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, deposit, withdraw } = useAuth();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="mb-6 text-center text-lg text-stone-700">
          Please log in to view transactions.
        </p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </div>
    );
  }

  return (
    <main className="h-screen mb-8 flex gap-8">
      <Sidebar user={user} />
      <div className="flex flex-col w-full align-items-center">
        <div className="my-24 text-center w-2/3 mx-auto">
          <h1 className="text-3xl font-bold text-stone-500 my-4">
            Current Balance :{" "}
            <span className="text-stone-700">
              ₹{user.transactions[user.transactions.length - 1].balance}
            </span>
          </h1>

          <div className="mt-8 flex flex-col items-center gap-6">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 w-1/2 border-2 border-stone-300 rounded-lg text-stone-700 bg-stone-200 focus:outline-none focus:border-yellow-400"
            />

            <div className="flex justify-center gap-6">
              <Button onClick={() => deposit(amount)}>Deposit</Button>
              <Button onClick={() => withdraw(amount)}>Withdraw</Button>
            </div>
          </div>
        </div>

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
