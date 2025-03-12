import React from "react";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import BrowserReload from "./BrowserReload";

function Menu() {
  //const user = JSON.parse(sessionStorage.getItem("user"));
  //const { logout, update, profile } = useContext(AuthContext);
  const token = sessionStorage.getItem("usertoken");
  const {fetchUserData, fetchProfileData, refresh, logout, update, profile, setProfile, setUser, user, loading, setLoading } = useContext(AuthContext);
  const { cartItems, getCartTotal } = useContext(CartContext);
 

  console.log("user", user);
  console.log("profile", profile);
  //console.log(profile);

  // useEffect(() => {
  //   if (profile) {
  //     sessionStorage.setItem("profile", JSON.stringify(profile));
  //   }
  // }, [profile]);

  useEffect( () => {
    
    if (token) {
      fetchUserData();
     // {loading && ( <BrowserReload />)}
      toast.success("Frissítetted a bongésződet!",{duration: 5000});
     
      setLoading(true);
    }
    
  }
  
  , []);

  useEffect(() => {
    
    if (user && token) {
    fetchProfileData();
    
    }
    
  }

  
  , [user]);

  

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    update();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        <Link to="/" className="btn btn-ghost text-xl text-primary">
          Flexor
        </Link>
      </div>
      <div className="flex-none">
        <Link to="/products" className="btn btn-ghost text-secondary font-bold">
          Termékek
        </Link>
      </div>
      {user ? (
        <>
        {user.isadmin >= 70 && (
            <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details className="relative">
                <summary className="text-secondary font-bold">Admin Dashboard</summary>
                <ul className="bg-base-100 rounded-t-none p-2 z-50 items-start text-left absolute">
                    <li><Link to="/admindashboard" className="btn btn-ghost text-secondary">Felhasználó Kezelő</Link></li>
                    <li><Link to="/newproduct" className="btn btn-ghost text-secondary">Új Termék</Link></li>
                    <li><Link to="/newcategory" className="btn btn-ghost text-secondary">Új Kategória</Link></li>
                    <li><Link to="/categories" className="btn btn-ghost text-secondary">Kategóriák</Link></li>
                    <li><Link to="/newpublicarea" className="btn btn-ghost text-secondary">Új Közterület</Link></li>
                    <li><Link to="/publicareas" className="btn btn-ghost text-secondary">Közterületek</Link></li>
                    <li><Link to="/newpaymentmethod" className="btn btn-ghost text-secondary">Új Fizetési mód</Link></li>
                    <li><Link to="/paymentmethods" className="btn btn-ghost text-secondary">Fizetési módok</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        )
      }
        </>
      ) : null}

      <div className="flex-none flex gap-4 items-center">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <div className="indicator">
              <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
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

        {user ? (
          <>
            <div className="rounded-box btn btn-ghost">
              <Link to="/profile" className="justify-between">
                <h1 className="font-bold text-secondary">Hello, {user.first_name} </h1>
              </Link>
            </div>
          </>
        ) : null}


        <div className="flex-none gap-2">

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
                      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path
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
