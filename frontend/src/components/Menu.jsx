import { useContext, useEffect,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import secureStorage from "../utils/secureStorage";

function Menu() {
  const user = secureStorage.getItem("user");
  const { logout, update, profile } = useContext(AuthContext);
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const closeDropdown = (e) => {
    const details = e.target.closest("details");
    if (details) {
      details.removeAttribute("open");
    }
  };

  return (
    <div className="navbar bg-base-100">
      {/* Bal oldal: logó */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl text-primary font-bold flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          FlexiStore
        </Link>
      </div>

      {/* Jobb oldal – Mobilon ikonok + hamburger */}
      <div className="md:hidden">
        {!user && (
          <>
          {/* Hamburger ikon */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" title="Fiók">
                <svg fill="none" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="14 9 17 12 14 15" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><line x1="17" y1="12" x2="3" y2="12" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M10,8V5a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H11a1,1,0,0,1-1-1V16" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/login2" className="text-primary font-medium">
                    Bejelentkezés
                  </Link>
                </li>
                <li>
                  <Link to="/register2" className="text-primary font-medium">
                    Regisztráció
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Jobb oldal – Desktop */}
      <div className="hidden md:flex md:items-center md:gap-4">
        <Link to="/lockers" className="btn btn-ghost text-primary font-bold">Csomagautomaták</Link>
        <Link to="/products" className="btn btn-ghost text-primary font-bold">Termékek</Link>
        {user ? (
        <>
          {user.isadmin >= 70 && (
            <div className="flex-none">
              <ul className="menu menu-horizontal px-1">
                <li>
                  <details className="relative">
                    <summary className="text-primary font-bold">Admin Dashboard</summary>
                    <ul className="bg-base-100 rounded-t-none p-2 z-50 items-start text-left absolute">
                      <li><Link to="/admindashboard" className="btn btn-ghost text-primary" onClick={closeDropdown}>Felhasználó kezelő</Link></li>
                      <li><Link to="/newcategory" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új kategória</Link></li>
                      <li><Link to="/newproduct" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új termék</Link></li>
                      <li><Link to="/newlocker" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új csomagautomata</Link></li>
                      <li><Link to="/newpublicarea" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új közterület</Link></li>
                      <li><Link to="/newpaymentmethod" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új fizetési mód</Link></li>
                      {user.isadmin >= 90 && (
                        <>
                          <li><Link to="/newrole" className="btn btn-ghost text-primary" onClick={closeDropdown}>Új jogosultság</Link></li>
                          <li><Link to="/roles" className="btn btn-ghost text-primary" onClick={closeDropdown}>Jogosultságok</Link></li>
                        </>
                      )}
                      <li><Link to="/categories" className="btn btn-ghost text-primary" onClick={closeDropdown}>Kategóriák</Link></li>
                      <li><Link to="/adminorders" className="btn btn-ghost text-primary" onClick={closeDropdown}>Orderek</Link></li>
                      <li><Link to="/publicareas" className="btn btn-ghost text-primary" onClick={closeDropdown}>Közterületek</Link></li>
                      <li><Link to="/paymentmethods" className="btn btn-ghost text-primary" onClick={closeDropdown}>Fizetési módok</Link></li>


                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          )
          }
        </>
      ) : null}

        {user && user.isadmin < 70 && (
          <Link to="/userdashboard" className="btn btn-ghost text-primary font-bold">User Dashboard</Link>
        )}
      </div>

      {/* Kosár + Profil / Auth gombok desktopon */}
      <div className="flex-none flex gap-4 items-center ml-4">
        <div className="hidden md:flex flex-none gap-4 items-center ml-4">
          {/* Kosár ikon */}
          <div className="dropdown dropdown-end">
            <div id="cart-button" tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg className="w-6 h-6" fill="none" stroke="#50c6c9" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" />
                </svg>
                <span className="badge badge-sm indicator-item">{user ? cartItems?.length || 0 : 0}</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
              <div className="card-body">
                <span className="text-lg font-bold text-primary">Termék: {cartItems?.length || 0} db</span>
                <span className="text-info">Összesen: {getCartTotal()} Ft</span>
                <div className="card-actions">
                  <Link to="/cart" id="cart-view" className="btn btn-primary btn-block text-white">Kosár megtekintése</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Profil vagy auth gombok */}
        {user ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  src={
                    profile?.file_path
                      ? `${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path}`
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="Profilkép"
                />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
              <li><Link to="/profile" className="text-primary font-medium">Profil adatok</Link></li>
              <li><a onClick={handleLogout} className="text-primary font-medium">Kijelentkezés</a></li>
            </ul>
          </div>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link to="/register2" className="btn btn-info text-white">Regisztráció</Link>
            <Link to="/login2" className="btn btn-primary text-white">Bejelentkezés</Link>
          </div>
        )}
      </div>
    </div>

  );
}

export default Menu;
