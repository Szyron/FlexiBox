import { useContext } from 'react'
import AdminDashboardCard from './AdminDashboardCard';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import secureStorage from '../../utils/secureStorage';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    //const user=JSON.parse(sessionStorage.getItem('user'));
    const user = secureStorage.getItem('user');
    const {users,setUsers} = useContext(AdminContext);
    const token = sessionStorage.getItem('usertoken');
    console.log("ADMIN BATTYA TOKEN",token);
    const navigate = useNavigate();
    if(user.isadmin<70){
          toast.error('Hozzáférés megtagadva!');
          navigate('/');
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => res.json())
            .then(adat => {
                setUsers(adat);
                //console.log(adat);
            })
            .catch(err => alert(err));
    }, []);


    /* useEffect(() => {
      if (!user || !token) return; // Ha nincs user vagy token, ne csináljon semmit
  
      fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
      })
      .then(async res => {
          if (!res.ok) {
              const errorText = await res.text(); // Próbáljuk kiolvasni a szerver válaszát
              throw new Error(`HTTP ${res.status}: ${errorText}`);
          }
          return res.json();
      })
      .then(adat => {
          setUsers(adat);
      })
      .catch(err => {
          console.error("Fetch hiba:", err);
          toast.error(`Hiba történt: ${err.message}`);
      });
  
  }, [user, token, setUsers]);  */

  const handleClose = () => {
    navigate('/'); // Navigálás a főoldalra vagy másik oldalra
  };
    
    
  return (
    <div className="min-h-screen overflow-x-auto bg-base-200 p-4">
      <h1 className="font-bold  text text-primary text-3xl text-center pb-10 mb-4">Regisztált Felhasználói Adatok</h1>
        <table className="table w-full bg-base-100 text-info font-bold">
        <thead className="bg-primary text-white">
      <tr>
        <th>Id</th>
        <th>Vezetéknév</th>
        <th>Keresztnév</th>
        <th>Email cím</th>
        <th>Jogosultság</th>
        <th>Létrehozva</th>
      </tr>
    </thead>
      {
          users.map((user) => <AdminDashboardCard key={user.id} user={user} />)
      }
        <tfoot className="bg-primary text-white">
      <tr>
        <th>Id</th>
        <th>Vezetéknév</th>
        <th>Keresztnév</th>
        <th>Email cím</th>
        <th>Jogosultság</th>
        <th>Létrehozva</th>
      </tr>
    </tfoot>
  </table>
    <div className="card-actions justify-end mt-6">
        <button className="btn btn-primary btn-circle absolute right-2 top-20 text-info"  onClick={handleClose}>
        ✕
        </button>
    </div>
  </div>
  )
}

export default AdminDashboard