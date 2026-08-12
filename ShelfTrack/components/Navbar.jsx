import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
     <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">
        ShelfTrack
      </h1>

      <div className="flex gap-6">
        <Link to="/dashboard">Dashboard</Link>
        {/* <Link to="/books">Books</Link>
        <Link to="/members">Members</Link>
        <Link to="/issue-desk">Issue Desk</Link> */}
      </div>
    </nav>
  )
}

export default Navbar
