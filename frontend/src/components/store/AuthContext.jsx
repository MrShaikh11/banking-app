import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/combined-users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        console.log(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        // setLoading(false);
      });
  }, []);

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

  const API_URL = "http://localhost:5000"; // Update with your backend URL

  const register = async (newUser) => {
    if (
      !newUser ||
      !newUser.name ||
      !newUser.email ||
      !newUser.password ||
      !newUser.balance
    ) {
      return { error: "Please fill all fields including balance." };
    }

    try {
      const response = await axios.post(`${API_URL}/register`, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        balance: newUser.balance,
      });

      if (response.status === 201) {
        console.log("User registered successfully:", response.data);
        return { success: true, user: response.data };
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      return { error: error.response?.data?.error || "Registration failed" };
    }
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
