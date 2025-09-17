import { Link } from "react-router-dom"
import AuthContext from "./context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Header({ toggleSidebar }) {

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          
    navigate("/login");
  };


    return (
        <header className="header flex justify-between items-center px-4 sm:px-6 py-5 sticky top-0 z-20 bg-base-100">
            <div className="flex items-center">
                <button
                    className="lg:hidden p-2 rounded-full hover:bg-[var(--bg-base-300)] mr-2"
                    onClick={toggleSidebar}
                >
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <button className="text-xl font-semibold text-info"><Link to="/">Irányítópult</Link></button>
                
            </div>


  <div className="flex gap-2 h-10">
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
        <li><button onClick={handleLogout} >Logout</button></li>
      </ul>
    </div>

  </div>
        </header>
    )
}

export default Header