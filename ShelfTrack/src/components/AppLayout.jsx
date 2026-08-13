import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gray-100 overflow-x-hidden">

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="flex w-full">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main
          className="
            min-w-0
            flex-1
            w-full
            p-3
            sm:p-4
            md:p-5
            lg:p-6
          "
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AppLayout;