import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./store/AuthContext";
import Header from "./Header";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [enteredName, setEnteredName] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [startingBalance, setStartingBalance] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  function handleInputChange(identifier, value) {
    switch (identifier) {
      case "name":
        setEnteredName(value);
        break;
      case "email":
        setEnteredEmail(value);
        break;
      case "password":
        setEnteredPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      case "balance":
        setStartingBalance(value);
        break;
      default:
        break;
    }
  }

  function handleRegister() {
    setSubmitted(true);
    setError(null);

    if (!enteredName || !enteredEmail || !enteredPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (!enteredEmail.includes("@")) {
      setError("Invalid email address");
      return;
    }
    if (enteredPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (enteredPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    register({
      name: enteredName,
      email: enteredEmail,
      password: enteredPassword,
      balance: startingBalance,
    });

    alert("Account created successfully! Please log in.");
    navigate("/login");
  }

  return (
    <>
      <Header title="Customer Portal" />
      <div className="w-full max-w-xl p-8 mx-auto rounded-lg shadow-lg bg-gradient-to-b from-[#474232] to-[#28271c] text-white">
        <div className="controls flex flex-col gap-2 mb-6">
          <p>
            <label className="block mb-2 text-xs font-bold tracking-widest uppercase text-gray-200">
              Name
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md border-transparent"
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
            />
          </p>
          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                submitted && !enteredEmail.includes("@")
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                submitted && !enteredEmail.includes("@")
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
                submitted && enteredPassword.length < 6
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                submitted && enteredPassword.length < 6
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
              onChange={(event) =>
                handleInputChange("password", event.target.value)
              }
            />
          </p>

          <p>
            <label
              className={`block mb-2 text-xs font-bold tracking-widest uppercase ${
                submitted && enteredPassword !== confirmPassword
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              className={`w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md ${
                submitted && enteredPassword !== confirmPassword
                  ? "border-2 border-red-500 bg-red-200"
                  : "border-transparent"
              }`}
              onChange={(event) =>
                handleInputChange("confirmPassword", event.target.value)
              }
            />
          </p>

          <p>
            <label className="block mb-2 text-xs font-bold tracking-widest uppercase text-gray-200">
              Starting Balance
            </label>
            <input
              type="number"
              className="w-full p-3 bg-gray-300 text-gray-800 rounded-md shadow-md border-transparent"
              onChange={(event) =>
                handleInputChange("balance", event.target.value)
              }
            />
          </p>
        </div>

        {error && <h1 className="text-center text-red-400">{error}</h1>}

        <div className="actions flex justify-between gap-4">
          <button
            type="button"
            className="text-button ml-3 text-stone-100 hover:cursor-pointer hover:text-yellow-300"
            onClick={() => navigate("/admin")}
          >
            Admin?
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="text-button text-stone-100 hover:cursor-pointer hover:text-yellow-300"
              onClick={() => navigate("/login")}
            >
              Login to Existing
            </button>
            <button
              className="button px-6 py-3 font-semibold uppercase rounded-md bg-stone-200 hover:bg-yellow-300 hover:cursor-pointer text-gray-800"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
