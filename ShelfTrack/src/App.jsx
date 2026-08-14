import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ManageBooks from "./pages/ManageBooks";
import ManageMembers from "./pages/ManageMembers";

import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/books" element={<ManageBooks />} />
            <Route path="/members" element={<ManageMembers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;