import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bankers() {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <main id="bankers-main" className="p-0">
      <Header title="Admin Portal" />
      <div className=" w-full max-w-xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-b from-[#474232] to-[#28271c] text-white">
        <div className="controls flex flex-col gap-2 mb-6">
          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                emailNotValid ? "text-red-400" : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                emailNotValid
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
            />
          </p>
          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                passwordNotValid ? "text-red-400" : "text-gray-200"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                passwordNotValid
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
            />
          </p>
        </div>

        <div className="actions flex justify-between gap-4">
          <button
            type="button"
            className="text-button ml-3 text-stone-100 hover:cursor-pointer hover:text-yellow-300"
            onClick={() => navigate("/login")}
          >
            Customer?
          </button>

          <div className="flex gap-4">
            <button
              className="button px-6 py-3 font-semibold uppercase rounded-md bg-stone-200 hover:bg-yellow-300 hover:cursor-pointer text-gray-800"
              onClick={handleLogin}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
