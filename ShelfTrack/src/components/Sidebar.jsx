import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({ isOpen, onClose }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");

    toast.success("Logout successful!");

    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }) =>
    `
      flex
      items-center
      w-full
      px-4
      py-3
      rounded-lg
      text-sm
      font-medium
      transition-colors
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
      }
    `;

  return (
    <aside className="w-64 min-h-[calc(100vh-64px)] bg-gray-900 text-white">

      <div className="p-5">

        <h2 className="text-lg font-semibold mb-6">
          Menu
        </h2>

        <nav className="space-y-2">

          <NavLink
            to="/dashboard"
            className={linkClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/books"
            className={linkClass}
          >
            Manage Books
          </NavLink>

          <NavLink
            to="/members"
            className={linkClass}
          >
            Manage Members
          </NavLink>

        </nav>

        {/* Logout */}
        <div className="mt-8 pt-5 border-t border-gray-700">

          <button
            type="button"
            onClick={handleLogout}
            className="
              flex
              items-center
              w-full
              px-4
              py-3
              rounded-lg
              text-red-400
              hover:bg-red-500/10
              hover:text-red-300
              transition-colors
            "
          >
            Logout
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;