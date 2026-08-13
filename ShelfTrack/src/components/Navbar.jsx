function Navbar({ onMenuClick }) {
  return (
    <nav
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        flex
        h-16
        w-full
        items-center
        justify-between
        border-b
        border-gray-200
        bg-white
        px-3
        sm:px-4
        md:px-6
      "
    >
      <div className="flex min-w-0 items-center">
        <button
          type="button"
          onClick={onMenuClick}
          className="
            mr-2
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            hover:bg-gray-100
            active:bg-gray-200
            lg:hidden
          "
        >
          <svg
            className="h-6 w-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <h1 className="truncate text-xl font-bold text-blue-600 sm:text-2xl">
          ShelfTrack
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="hidden text-sm text-gray-600 md:block">
          Welcome, User
        </span>

        <button
          type="button"
          className="
            whitespace-nowrap
            rounded-lg
            bg-gray-100
            px-3
            py-2
            text-sm
            hover:bg-gray-200
            sm:px-4
          "
        >
          Profile
        </button>
      </div>
    </nav>
  );
}

export default Navbar;