import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import Header from "./Header";
import Button from "./Button";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => email.includes("@");
  const validatePassword = (password) => password.trim().length >= 6;

  const handleLogin = () => {
    setSubmitted(true);
    setError(null);
    setLoading(true);

    const enteredEmail = emailRef.current?.value?.trim();
    const enteredPassword = passwordRef.current?.value?.trim();

    const result = login(enteredEmail, enteredPassword);

    if (result.success) {
      console.log("Logged in:", result.user);
      setTimeout(() => {
        setLoading(false);
        navigate("/");
      }, 500);
    } else {
      setLoading(false);
      setSubmitted(false);
      setError(result.message);
    }
  };

  return (
    <>
      <Header title="Customer Portal" />
      <div className="w-full max-w-xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-b from-[#474232] to-[#28271c] text-white">
        <div className="controls flex flex-col gap-2 mb-6">
          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                submitted && !validateEmail(emailRef.current?.value)
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              ref={emailRef}
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                submitted && !validateEmail(emailRef.current?.value)
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
            />
          </p>
          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                submitted && !validatePassword(passwordRef.current?.value)
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              ref={passwordRef}
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                submitted && !validatePassword(passwordRef.current?.value)
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
            />
          </p>
        </div>

        {error && <h1 className="text-center text-red-400">{error}</h1>}

        <div className="actions flex justify-between gap-4">
          <button
            type="button"
            className="text-button ml-3 text-stone-100 hover:cursor-pointer hover:text-yellow-300"
            onClick={() => navigate("/admin-login")}
          >
            Admin?
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="text-button text-stone-100 hover:cursor-pointer hover:text-yellow-300"
              onClick={() => navigate("/register")}
            >
              Create a new account
            </button>
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
    </>
  );
}
