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
      w-full
      items-center
      rounded-lg
      px-4
      py-3
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
    <>
      <div
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          transition-opacity
          lg:hidden
          ${isOpen ? "block" : "hidden"}
        `}
        onClick={onClose}
      />

      <aside
        className={`
          fixed
          bottom-0
          left-0
          top-16
          z-50
          w-64
          overflow-y-auto
          bg-gray-900
          text-white
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <div className="p-5">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Menu
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-2 py-1 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
            >
              ✕
            </button>
          </div>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              className={linkClass}
              onClick={onClose}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/books"
              className={linkClass}
              onClick={onClose}
            >
              Manage Books
            </NavLink>

            <NavLink
              to="/members"
              className={linkClass}
              onClick={onClose}
            >
              Manage Members
            </NavLink>
          </nav>

          <div className="mt-8 border-t border-gray-700 pt-5">
            <button
              type="button"
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                rounded-lg
                px-4
                py-3
                text-red-400
                transition-colors
                hover:bg-red-500/10
                hover:text-red-300
              "
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;