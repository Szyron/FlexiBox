import { useContext } from 'react'
import AdminDashboardCard from './AdminDashboardCard';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import secureStorage from '../../utils/secureStorage';

function AdminDashboard() {
    //const user=JSON.parse(sessionStorage.getItem('user'));
    const user = secureStorage.getItem('user');
    const {users} = useContext(AdminContext);
    if(user.isadmin<70){
        return (
            <div>
                {toast.error('Access Denied')}
            </div>
        )
    }

    

    
    
  return (
    <div className="bg-base-200 min-h-screen overflow-x-auto">
        <h1 className="font-bold  text text-secondary text-3xl text-center p-10">Regisztált Felhasználói Adatok</h1>
        <table className="table table-xs bg-white">
        <thead>
      <tr>
        <th>Id</th>
        <th>Vezetéknév</th>
        <th>Keresztnév</th>
        <th>Email cím</th>
        <th>Létrehozva</th>
      </tr>
    </thead>
      {
          users.map((user) => <AdminDashboardCard key={user.id} user={user} />)
      }
        <tfoot>
      <tr>
        <th>Id</th>
        <th>Vezetéknév</th>
        <th>Keresztnév</th>
        <th>Email cím</th>
        <th>Létrehozva</th>
      </tr>
    </tfoot>
  </table>
    </div>
  )
}

export default AdminDashboard