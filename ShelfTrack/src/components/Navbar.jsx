function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">

      <h1 className="text-2xl font-bold text-blue-600">
        ShelfTrack
      </h1>

      
      <div className="flex items-center gap-4">

        <span className="text-gray-600">
            Welcome, User
        </span>

        <button
          type="button"
          className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          Profile
        </button>

      </div>

    </nav>
  );
}

export default Navbar;