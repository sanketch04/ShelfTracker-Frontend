import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-gray-900 text-white">
      <div className="p-5">

        <h2 className="text-lg font-semibold mb-6">
          Menu
        </h2>

        <nav className="space-y-2">

          {/* Dashboard */}
          <NavLink
            to="/dashboard"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Dashboard
          </NavLink>


          {/* Manage Books */}
          <NavLink
            to="/books"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Manage Books
          </NavLink>


          {/* Manage Members */}
          <NavLink
            to="/members"
            className="block px-4 py-3 rounded-lg hover:bg-gray-800"
          >
            Manage Members
          </NavLink>

        </nav>

      </div>
    </aside>
  );
}

export default Sidebar;