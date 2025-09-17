import SidebarLink from "./SidebarLink";
import { ShoppingCartIcon, UsersIcon, ArchiveBoxIcon, TruckIcon, Squares2X2Icon, XMarkIcon, RectangleGroupIcon, ArrowRightStartOnRectangleIcon, CreditCardIcon, GlobeEuropeAfricaIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import AuthContext from './context/AuthContext';
import { useContext } from 'react'
import { useNavigate } from "react-router-dom";


function Sidebar({ isOpen, toggle }) {


    const { logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };




    return (
        <>
            <div
                id="sidebar-overlay"
                className={`fixed inset-0 bg-black/50 z-30 lg:hidden ${isOpen ? "block" : "hidden"
                    }`}
                onClick={toggle}
            ></div>


            <aside
                id="sidebar"
                className={`w-64 h-screen sidebar  flex flex-col fixed top-0 left-0 z-40 transition-transform lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-6 text-2xl font-bold bg-base-100 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                            <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-primary ">FlexiStore</span>
                    </div>
                    <button
                        onClick={toggle}
                        className="lg:hidden p-1 rounded-full hover:bg-[var(--bg-base-300)]"
                    >
                        <XMarkIcon className="w-6 h-6 text-primary" />
                    </button>
                </div>


                <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto bg-base-100 w-full">
                    <div className="border-t border-b border-info py-4">
                        <p className="menu-title px-4 mb-2 text-info">Menü</p>
                        <SidebarLink active icon={<Squares2X2Icon className="w-8 h-8 text-primary" />} label="Irányítópult" to="/" />
                        <SidebarLink icon={<ShoppingCartIcon className="w-8 h-8 text-primary" />} label="Rendelések"  />
                        <SidebarLink icon={<UsersIcon className="w-8 h-8 text-primary" />} label="Felhasználók" to="/admindashboard" />
                        <SidebarLink icon={<TruckIcon className="w-8 h-8 text-primary" />} label="Csomagautomaták" to="/lockers" />
                    </div>
                    <div className="border-b border-info">
                        <p className="menu-title px-4 mb-2 mt-4 text-info">Beállítások</p>
                        <SidebarLink icon={<RectangleGroupIcon className="w-8 h-8 text-primary" />} label="Kategóriák" to="/categories" />
                        <SidebarLink icon={<GlobeEuropeAfricaIcon className="w-8 h-8 text-primary" />} label="Közterületek" to="/publicareas" />
                        <SidebarLink icon={<CreditCardIcon className="w-8 h-8 text-primary" />} label="Fizetési módok" to="/paymentmethods" />
                        <SidebarLink icon={<LockClosedIcon className="w-8 h-8 text-primary" />} label="Jogosultságok" to="/roles" />
                    </div>
                </nav>


                <div className="p-4 bg-base-300">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-base-100 hover:bg-base-200 transition"
                    >
                        <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-primary" />
                        <span className="font-medium">Kijelentkezés</span>
                    </button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar