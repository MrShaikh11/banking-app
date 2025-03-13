import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/store/AuthContext.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Bankers from "./components/Bankers.jsx";
import data from "./data.js";
export default function App() {
  // const [accounts, setAccounts] = useState(data || []);
  // console.log(account);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Bankers />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
