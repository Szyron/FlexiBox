import { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import Dashboard from './Dashboard'
import { Outlet } from 'react-router-dom'

function Layout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
<div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="flex-1 flex flex-col lg:ml-64 bg-base-200">
        <Header toggleSidebar={toggleSidebar} />
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Itt cserélődnek az oldalak */}
          <Outlet />
        </div>
      </div>
    </div>
    )
}

export default Layout