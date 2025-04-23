
import FooterInfoUse from "./Term/FooterInfoUse";
import FooterPrivacyInfo from "./Term/FooterPrivacyInfo";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import secureStorage from "../utils/secureStorage";


function Footer() {
  const [isTermInfo, setTermInfo] = useState(false);
  const [isPolicyInfo, setPolicyInfo] = useState(false);

  const openTermInfo = () => {
    setTermInfo(true);
  };

  const openPolicyInfo = () => {
    setPolicyInfo(true);
  }

  const closeInfo = () => {
    setTermInfo(false);
  };

  const closePolicy = () => {
    setPolicyInfo(false);
  };



  const user = secureStorage.getItem("user");
  const { logout, update, profile } = useContext(AuthContext);
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAdminOpen, setMenuAdminOpen] = useState(false);

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
    <div className="relative">
      {isTermInfo && (
        <FooterInfoUse closeFunction={closeInfo} />
      )}
      {isPolicyInfo && (
        <FooterPrivacyInfo closeFunction={closePolicy} />
      )}

      {/* Felső lábléc: navigációs linkek (csak desktop/tablet nézet) */}
      <footer className="footer bg-base-100 text-base-content px-6 py-10 hidden sm:flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-12 text-center sm:text-left">
        <nav className="min-w-[150px]">
          <h6 className="footer-title text-secondary">Szolgáltatások</h6>
          <Link to="/lockers" className="link link-hover text-info">Csomagautomaták</Link>
          <Link to="/products" className="link link-hover text-info">Összes Termék</Link>
        </nav>
        <nav className="min-w-[150px]">
          <h6 className="footer-title text-secondary">Jogi információk</h6>
          <button className="text-info link-hover" onClick={openTermInfo}>Felhasználási feltételek</button>
          <button className="text-info link-hover" onClick={openPolicyInfo}>Adatvédelmi irányelvek</button>
        </nav>
      </footer>

      {/* Alsó lábléc: logó, copyright, ikonok (desktop/tablet) */}
      <footer className="footer bg-base-100 text-base-content border-t border-primary px-6 py-6 hidden md:flex flex-col md:flex-row justify-between items-center gap-4">
        <aside className="flex items-center gap-4 text-center md:text-left">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-primary font-bold">
            <p>FlexiStore</p>
            <p className="text-sm">Minden jog fenntartva © 2025</p>
          </div>
        </aside>

        <nav className="flex gap-4">
          <a href="#" aria-label="Instagram">
            <svg width="32" height="32" fill="#50c6c9" viewBox="0 0 24 24"><path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" /></svg>
          </a>
          <a href="#" aria-label="Facebook">
            <svg width="32" height="32" fill="#50c6c9" viewBox="0 0 32 32"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z" /></svg>
          </a>
        </nav>
      </footer>

      {/* Mobil / tablet alsó navigáció */}
      <footer className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-primary p-2 flex justify-around items-center md:hidden z-50">
        {/* User Menü Nyitás */}
        <button onClick={() => setMenuOpen(true)} className="flex flex-col items-center text-primary text-xs">
          {/* Hamburger ikon */}
          <svg fill="none" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <line x1="3" y1="12" x2="21" y2="12" className="stroke-[#50c6c9]" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M3,18H21M3,6H21" className="stroke-[#50c6c9]" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>

        {/* User Menü Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMenuOpen(false)} />

        {/* User Menü Panel */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)} className="text-xl font-bold text-primary">✕</button>
          </div>
          <ul className="menu p-4 gap-2">
            <li><Link to="/lockers" className="text-primary font-medium" onClick={() => setMenuOpen(false)}>Csomagautomaták</Link></li>
            <li><Link to="/products" className="text-primary font-medium" onClick={() => setMenuOpen(false)}>Termékek</Link></li>
            {user && user.isadmin < 70 && (
              <li><Link to="/userdashboard" className="text-primary font-medium" onClick={() => setMenuOpen(false)}>User Dashboard</Link></li>
            )}
          </ul>
        </div>
        {user?.isadmin >= 70 && (
        <button onClick={() => setMenuAdminOpen(true)} className="flex flex-col items-center text-primary text-xs">
          {/* Admin ikon */}
          <svg fill="none" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M7.94,20a1,1,0,0,1-.87-.51l-3.94-7a1,1,0,0,1,0-1l3.94-7A1,1,0,0,1,7.94,4h8.12a1,1,0,0,1,.87.51l3.94,7a1,1,0,0,1,0,1l-3.94,7a1,1,0,0,1-.87.51Z" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </button>
        )}
        {/* Admin Menü Overlay */}
        <div className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${menuAdminOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setMenuAdminOpen(false)} />

        {/* Admin Menü Panel */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-base-100 shadow-lg z-50 transform transition-transform duration-300 ${menuAdminOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuAdminOpen(false)} className="text-xl font-bold text-primary">✕</button>
          </div>
          {user?.isadmin >= 70 && (
            <ul className="menu p-4 gap-2">
              <li><Link to="/admindashboard" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Felhasználó Kezelő</Link></li>
              <li><Link to="/newproduct" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Termék</Link></li>
              <li><Link to="/newproduct" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Termék</Link></li>
              <li><Link to="/newcategory" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Kategória</Link></li>
              <li><Link to="/categories" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Kategóriák</Link></li>
              <li><Link to="/newpublicarea" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Közterület</Link></li>
              <li><Link to="/publicareas" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Közterületek</Link></li>
              <li><Link to="/newpaymentmethod" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Fizetési mód</Link></li>
              <li><Link to="/paymentmethods" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Fizetési módok</Link></li>
              <li><Link to="/newlocker" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Autómaták</Link></li>
              <li><Link to="/adminorders" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Orderek</Link></li>
              {user.isadmin >= 90 && (
                <>
                  <li><Link to="/newrole" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Új Jogosultság</Link></li>
                  <li><Link to="/roles" className="btn btn-ghost text-primary" onClick={() => setMenuAdminOpen(false)}>Jogosultságok</Link></li>
                </>
              )}
            </ul>
          )}
        </div>
        <Link to="/cart" className="flex flex-col items-center text-primary text-xs">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
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
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link to="/info" className="flex flex-col items-center text-primary text-xs">
          <svg fill="none" width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <line x1="12.05" y1="8" x2="11.95" y2="8" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <line x1="12" y1="13" x2="12" y2="16" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M3,12a9,9,0,0,1,9-9h0a9,9,0,0,1,9,9h0a9,9,0,0,1-9,9h0a9,9,0,0,1-9-9Z" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </Link>
      </footer>
    </div>
  )
}

export default Footer