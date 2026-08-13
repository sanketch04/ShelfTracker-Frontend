import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Sidebar({ isOpen, onClose }) {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Remove logged-in user
    localStorage.removeItem("user");

    // Close mobile sidebar
    if (onClose) {
      onClose();
    }

    // Show message
    toast.success("Logout successful!");

    // Go to login page
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
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-16
          left-0
          bottom-0
          z-50
          w-64
          bg-gray-900
          text-white
          overflow-y-auto
          transition-transform
          duration-300
          ease-in-out

          lg:sticky
          lg:top-16
          lg:h-[calc(100vh-4rem)]
          lg:translate-x-0

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="p-4 sm:p-5">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">

            <h2 className="text-lg font-semibold">
              Menu
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                lg:hidden
                flex
                items-center
                justify-center
                w-9
                h-9
                rounded-lg
                hover:bg-gray-800
              "
            >
              <span className="text-xl">
                ×
              </span>
            </button>

          </div>


          {/* Navigation */}
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
                text-sm
                font-medium
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
    </>
  );
}

export default Sidebar;
