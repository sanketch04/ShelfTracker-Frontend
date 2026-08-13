import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="ml-0 h-screen overflow-y-auto overflow-x-hidden pt-16 lg:ml-64">
        <div className="w-full p-3 sm:p-4 md:p-5 lg:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;