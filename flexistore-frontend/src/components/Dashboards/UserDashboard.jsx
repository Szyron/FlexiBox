import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import secureStorage from '../../utils/secureStorage';
import UserOrdersCard from './UserOrdersCard';


function UserDashboard() {
  const navigate = useNavigate();
  const user = secureStorage.getItem('user');
  const { clearCart } = useContext(CartContext);

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchLockerName, setSearchLockerName] = useState('');
  const [searchLockerAddress, setSearchLockerAddress] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/userorderslist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('usertoken')}`,
        'userId': user.id,
      },
    })
      .then(async (response) => {
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status} - ${errorText}`);
        }

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setOrders(data);
          setFilteredOrders(data);
        } else {
          throw new Error('');
        }
      })
      .catch((error) => {
        console.error('Fetch hiba:', error.message);
      });
  }, []);

  const handleSearch = (event) => {
    const { name, value } = event.target;
    if (name === 'searchName') {
      setSearchName(value);
    } else if (name === 'searchEmail') {
      setSearchEmail(value);
    } else if (name === 'searchLockerName') {
      setSearchLockerName(value);
    } else if (name === 'searchLockerAddress') {
      setSearchLockerAddress(value);
    }
    if (!value) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter((order) => {
        const fullName = order.user
          ? `${order.user.first_name} ${order.user.last_name}`.toLowerCase()
          : '';

        const email = order.user && order.user.email
          ? order.user.email.toLowerCase()
          : '';

        const lockerName = order.order_item && order.order_item[0] && order.order_item[0].locker && order.order_item[0].locker.locker_name
          ? order.order_item[0].locker.locker_name.toLowerCase()
          : '';

        const lockerAddress = order.order_item && order.order_item[0] && order.order_item[0].locker && order.order_item[0].locker.address
          ? order.order_item[0].locker.address.toLowerCase()
          : '';

        return (
          fullName.includes(searchName.toLowerCase()) &&
          email.includes(searchEmail.toLowerCase()) &&
          lockerName.includes(searchLockerName.toLowerCase()) &&
          lockerAddress.includes(searchLockerAddress.toLowerCase())
        );
      });

      setFilteredOrders(filtered);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/userorders`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('usertoken')}`,
        },
        body: JSON.stringify({ order_id: orderId })
      });

      if (!response.ok) {
        toast.error('Hiba történt a rendelés törlésekor');
      }

      const data = await response.json();
      toast.success(data.message);
      setOrders(orders.filter((order) => order.id !== orderId));
      setFilteredOrders(filteredOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Hiba történt a rendelés törlésében:', error);
      toast.error('Hiba történt a rendelés törlésében');
    }
  };

  return (
    <div className="bg-base-200 min-h-screen p-4">
  <h1 className="text-3xl font-bold text-center mb-4 text-primary">Megrendelések</h1>

  {/* Hamburger Menü Ikon (mobilon) */}
  <button
    onClick={() => setIsFilterOpen(true)}
    className="lg:hidden fixed bottom-20 right-1 p-2 rounded-full bg-primary text-white shadow-lg z-50"
  >
    <svg
      fill="none"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5,3V17M12,7V21m7-7v7m0-11V3"
        className="stroke-[#005c6a] fill-none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5,17a2,2,0,1,0,2,2A2,2,0,0,0,5,17ZM12,3a2,2,0,1,0,2,2A2,2,0,0,0,12,3Zm7,7a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
        className="stroke-[#2ca9bc] fill-none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  </button>

  {/* Mobilos szűrőpanel */}
  <div
    className={`fixed top-0 right-0 w-64 h-full bg-base-100 shadow-lg transform transition-transform z-50 ${
      isFilterOpen ? "translate-x-0" : "translate-x-full"
    } lg:hidden`}
  >
    <div className="p-4">
      <div className="flex justify-end">
        <button
          className="text-xl font-bold text-primary"
          onClick={() => setIsFilterOpen(false)}
        >
          ✕
        </button>
      </div>
      <h2 className="text-xl font-bold mb-4 text-primary text-center">Szűrők</h2>
      <div className="divider divider-info"></div>
      {/** Szűrő inputok */}
      <div className="form-control mb-4">
        <input type="text" name="searchName" value={searchName} onChange={handleSearch} placeholder="Keresés név szerint" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchEmail" value={searchEmail} onChange={handleSearch} placeholder="Keresés email szerint" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchLockerName" value={searchLockerName} onChange={handleSearch} placeholder="Csomagautomata név" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchLockerAddress" value={searchLockerAddress} onChange={handleSearch} placeholder="Csomagautomata cím" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
    </div>
  </div>

  {/* Rugalmas elrendezés */}
  <div className="flex flex-col lg:flex-row gap-6">
    {/* Szűrők - asztali nézet */}
    <div className="hidden lg:block w-[20%] p-4">
      <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>
      <div className="form-control mb-4">
        <input type="text" name="searchName" value={searchName} onChange={handleSearch} placeholder="Keresés név szerint" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchEmail" value={searchEmail} onChange={handleSearch} placeholder="Keresés email szerint" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchLockerName" value={searchLockerName} onChange={handleSearch} placeholder="Csomagautomata név" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
      <div className="form-control mb-4">
        <input type="text" name="searchLockerAddress" value={searchLockerAddress} onChange={handleSearch} placeholder="Csomagautomata cím" className="input input-bordered w-full input-primary placeholder-info" />
      </div>
    </div>

    {/* Megrendeléskártyák */}
    <div className="w-full lg:w-4/5 flex flex-wrap justify-start gap-4 p-4">
      {currentOrders.map((order) => (
        <UserOrdersCard key={order.id} order={order} handleDelete={handleDelete} />
      ))}
    </div>
  </div>

  {/* Lapozás */}
  <div className="join flex justify-center mt-4 mb-24">
    <button className="join-item btn btn-primary" onClick={handlePrevPage} disabled={currentPage === 1}>«</button>
    <button className="join-item btn btn-info">Oldal {currentPage} / {totalPages}</button>
    <button className="join-item btn btn-primary" onClick={handleNextPage} disabled={currentPage === totalPages}>»</button>
  </div>

  {/* Bezáró gomb */}
  <div className="card-actions justify-end mt-6">
    <button className="btn btn-primary btn-circle absolute right-2 top-20 text-info" onClick={handleClose}>✕</button>
  </div>
</div>
  );
}

export default UserDashboard