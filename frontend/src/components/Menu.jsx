import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Menu() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { logout, update, profile} = useContext(AuthContext);
  const { cartItems, getCartTotal} = useContext(CartContext);


  console.log(profile);

  /*   useEffect(() => {
    if (user) {
      fetchProfile(user.id);
    }
  }, [user, fetchProfile]); */

  useEffect(() => {
    if (profile) {
      sessionStorage.setItem("profile", JSON.stringify(profile));
    }
  }, [profile]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    update();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 12V21" stroke="#50c6c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8.5 4.5L16 9" stroke="#50c6c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        <Link to="/" className="btn btn-ghost text-xl">
          Flexibox
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <>
            {user.isadmin >= 70 && (
              <Link to="/newcategory" className="btn btn-ghost">
                Új Kategória
              </Link>
            )}
          </>
        ) : null}
      </div>
      <div className="flex-none">
        <Link to="/categories" className="btn btn-ghost">
          Kategóriák
        </Link>
      </div>
      <div className="flex-none">
        {user ? (
          <>
            {user.isadmin >= 70 && (
              <Link to="/newproduct" className="btn btn-ghost">
                Új Termék
              </Link>
            )}
          </>
        ) : null}
      </div>
      <div className="flex-none">
        <Link to="/products" className="btn btn-ghost">
          Termékek
        </Link>
      </div>
      <div>
        {user ? (
          <>
            {user.isadmin >= 70 && (
              <Link to="/admindashboard">Admin Dashboard</Link>
            )}

            {user.isadmin > 10 && user.isadmin < 70 && (
              <Link to="/userdashboard" className="justify-between">
                User Dashboard
              </Link>
            )}
          </>
        ) : (
          <>
            <Link to="/" className="justify-between">
              Guest
            </Link>
          </>
        )}
      </div>
      <div className="flex-none gap-2">
        <div className="m-10">
          {user ? (
            <>
              <h1>Hello, {user.first_name} </h1>
            </>
          ) : (
            <>
              <h1>Hello,Guest </h1>
            </>
          )}
        </div>
        <div className="flex-none flex gap-4 items-center">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#50c6c9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <span className="badge badge-sm indicator-item">
                {user ? (
                  (cartItems.length > 0 ? cartItems.length : 0)
                  ) : (
                    0
                  ) 
                }
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{cartItems.length}
                 
                  Items</span>
                <span className="text-info">Subtotal:
               
                  
                  
                  
                   $ {getCartTotal()}</span>
                <div className="card-actions">
                  <Link to="/cart" className="btn btn-primary btn-block">
                    View cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {profile && profile.file_path ? (
                  <>
                    <img
                      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${
                        profile.file_path
                      }`}
                      //src={`http://localhost:8000/storage/images/1738181966_profileimage.jpg`}
                      alt="Pofile"
                    />
                  </>
                ) : (
                  <>
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </>
                )}
              </div>
            </div>

            {user !== null ? (
              <>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/register2" className="justify-between">
                      Register
                    </Link>
                  </li>

                  <li>
                    <Link to="/login2">Login</Link>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
