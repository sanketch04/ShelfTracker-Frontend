import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="flex">
        <Sidebar />

        
     <main className="flex-1 p-3">
       <Outlet />
     </main>

      </div>

    </div>
  );
}

export default AppLayout;