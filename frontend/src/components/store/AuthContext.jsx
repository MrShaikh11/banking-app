import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "../../data.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(data || []);
  const [user, setUser] = useState(null);

  const validateEmail = (email) => email.includes("@");

  const validatePassword = (password) => password.trim().length >= 6;

  const login = (email, password) => {
    if (!email || !password) {
      return { success: false, message: "Please fill all the fields" };
    }

    if (!validateEmail(email)) {
      return { success: false, message: "Please enter a valid email address" };
    }

    if (!validatePassword(password)) {
      return {
        success: false,
        message: "Password must be at least 6 characters long",
      };
    }

    const validAccount = users.find(
      (account) => account.email === email && account.password === password
    );

    if (validAccount) {
      setUser(validAccount);
      return { success: true, message: "Login successful", user: validAccount };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  const register = (newUser) => {
    if (!newUser || !newUser.email || !newUser.password || !newUser.balance) {
      return { error: "Please fill all fields including balance." };
    }

    const existingUser = users.find((user) => user.email === newUser.email);

    if (existingUser) {
      return { error: "User already exists with this email." };
    }

    // Create the new user with an initial transaction
    const registeredUser = {
      id: crypto.randomUUID(),
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: "user",
      transactions: [
        {
          type: "withdraw",
          amt: 0,
          balance: newUser.balance,
        },
      ],
    };
    console.log(registeredUser);

    // Add the new user to the array
    users.push(registeredUser);

    // Save the user to localStorage or your backend (if needed)
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, user: registeredUser };
  };

  const deposit = (amount) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount to deposit.");
      return;
    }
    const newBalance =
      user.transactions[user.transactions.length - 1].balance + amt;

    const newTransaction = {
      id: Date.now(),
      amt: amt,
      balance: newBalance,
      type: "deposit",
    };

    setUser((prevUser) => ({
      ...prevUser,
      transactions: [...prevUser.transactions, newTransaction],
    }));
  };

  const withdraw = (amount) => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Please enter a valid amount to withdraw.");
      return;
    }

    const currentBalance =
      user.transactions[user.transactions.length - 1].balance;

    if (amt > currentBalance) {
      alert("Insufficient balance.");
      return;
    }

    const newBalance = currentBalance - amt;

    const newTransaction = {
      id: Date.now(),
      amt: amt,
      balance: newBalance,
      type: "withdraw",
    };

    setUser((prevUser) => ({
      ...prevUser,
      transactions: [...prevUser.transactions, newTransaction],
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, login, logout, deposit, withdraw, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
