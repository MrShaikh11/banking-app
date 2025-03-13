import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/store/AuthContext.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Home from "./components/Home.jsx";
import Bankers from "./components/BankersLogin.jsx";
import Admin from "./components/Admin.jsx";
import AdminDetail from "./components/AdminDetail.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<Bankers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-detail" element={<AdminDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
