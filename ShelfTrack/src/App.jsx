import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppLayout from "./components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageBooks from "./pages/ManageBooks";
import ManageMembers from "./pages/ManageMembers";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/books" element={<ManageBooks />} />
          <Route path="/members" element={<ManageMembers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
