import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import secureStorage from '../../utils/secureStorage';
import AdminDashboardCard from './AdminDashboardCard';
import UserCard from './UserCard';

function AdminDashboard() {
  const user = secureStorage.getItem('user');
  const { users, setUsers } = useContext(AdminContext);
  const token = sessionStorage.getItem('usertoken');
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (!user || user.isadmin < 70) {
      toast.error('Hozzáférés megtagadva!');
      navigate('/');
      return;
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(adat => {
        setUsers(adat);
      })
      .catch(err => alert(err));
  }, []);

  // Szűrés név vagy email alapján
  useEffect(() => {
    const filtered = users.filter(u =>
      u.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, users]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-base-200 p-4 overflow-x-auto">
      <h1 className="font-bold text-primary text-3xl text-center pb-10 mb-4">
        Regisztrált Felhasználói Adatok
      </h1>

      {/* Kereső mező - mindkét nézetre */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Keresés név vagy email alapján"
          className="input input-bordered input-primary w-full max-w-md placeholder-info"
        />
      </div>

      {/* Desktop: Table */}
      <table className="hidden lg:table w-full bg-base-100 text-info font-bold">
        <thead className="bg-primary text-white">
          <tr>
            <th>Id</th>
            <th>Vezetéknév</th>
            <th>Keresztnév</th>
            <th>Email cím</th>
            <th>Jogosultság</th>
            <th>Létrehozva</th>
            <th colSpan={2} className="text-center">Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <AdminDashboardCard key={user.id} user={user} />
          ))}
        </tbody>
        <tfoot className="bg-primary text-white">
          <tr>
            <th>Id</th>
            <th>Vezetéknév</th>
            <th>Keresztnév</th>
            <th>Email cím</th>
            <th>Jogosultság</th>
            <th>Létrehozva</th>
            <th colSpan={2}></th>
          </tr>
        </tfoot>
      </table>

      {/* Mobile/Tablet: Cards */}
      <div className="lg:hidden flex flex-col gap-4">
        {paginatedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination - mobile & desktop alatt is megjelenhet */}
      <div className="join flex justify-center mt-10 mb-24">
        <button
          className="join-item btn btn-secondary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn btn-primary text-white">
          Oldal {currentPage} / {totalPages}
        </button>
        <button
          className="join-item btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

      {/* Bezárás gomb */}
      <div className="hidden lg:flex card-actions justify-end mt-6">
        <button
          className="btn btn-primary btn-circle absolute right-2 top-20 text-info"
          onClick={handleClose}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;