import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/AppLayout";


import "./App.css";
import Index from "./pages/Index";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>

          <Route path="/" element={<Index/>} />

         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
