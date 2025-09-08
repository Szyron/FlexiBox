import React from 'react'
import { Link } from "react-router-dom";

function Menu() {


  return (
    <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">

    <Link to="/" className="btn btn-ghost text-xl text-primary">
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      FlexiStore - Admin Dashboard</Link>
  </div>
  <div className="navbar-end">
    <button className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
        <span className="badge badge-xs badge-primary indicator-item"></span>
      </div>
    </button>
  </div>
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>

  </div>
</div>
  )
}

export default Menu