import Header from "./Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BankersLogin() {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === "email") {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
    setLoading(true);

    setSubmitted(true);
    setLoading(true);

    if (enteredEmail === "admin@gmail.com" && enteredPassword === "123456") {
      setTimeout(() => {
        setLoading(false);
        navigate("/admin");
      }, 1000);
    } else {
      setLoading(false);
      setSubmitted(false);
    }
  }

  const emailNotValid = submitted && !enteredEmail.includes("@");
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <main id="bankers-main" className="p-0">
      <Header title="Admin Portal" />
      <div className="w-full max-w-xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-b from-[#474232] to-[#28271c] text-white">
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
            <Button
              className={`button px-6 py-3 font-semibold uppercase rounded-md transition duration-300 ${
                loading ? "bg-gray-400 cursor-not-allowed" : " "
              }`}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-yellow-500"
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
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
