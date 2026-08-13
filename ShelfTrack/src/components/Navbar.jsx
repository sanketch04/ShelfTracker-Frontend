function Navbar({ onMenuClick }) {
  return (
    <nav
      className="
        sticky
        top-0
        z-40
        h-16
        w-full
        bg-white
        border-b
        border-gray-200
        flex
        items-center
        justify-between
        px-3
        sm:px-4
        md:px-6
      "
    >

      <div className="flex items-center min-w-0">

        <button
          type="button"
          onClick={onMenuClick}
          className="
            lg:hidden
            flex
            items-center
            justify-center
            w-10
            h-10
            mr-2
            rounded-lg
            hover:bg-gray-100
            active:bg-gray-200
          "
        >
          <svg
            className="w-6 h-6 text-gray-700"
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

        <h1
          className="
            text-xl
            sm:text-2xl
            font-bold
            text-blue-600
            truncate
          "
        >
          ShelfTrack
        </h1>

      </div>


      <div className="flex items-center gap-2 sm:gap-4">

        <span className="hidden md:block text-sm text-gray-600">
          Welcome, User
        </span>

        <button
          type="button"
          className="
            px-3
            py-2
            sm:px-4
            text-sm
            bg-gray-100
            rounded-lg
            hover:bg-gray-200
            whitespace-nowrap
          "
        >
          Profile
        </button>

      </div>

    </nav>
  );
}

export default Navbar;