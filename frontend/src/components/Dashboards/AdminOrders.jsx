import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import secureStorage from '../../utils/secureStorage';
import { CartContext } from '../../context/CartContext';
import AdminOrdersCard from './AdminOrdersCard';
import { toast } from 'react-toastify';

function AdminOrders() {
  const navigate = useNavigate();
  const user = secureStorage.getItem('user');
  const { clearCart } = useContext(CartContext);

  const [orders, setOrders] = useState([]); // Az összes rendelés
  const [filteredOrders, setFilteredOrders] = useState([]); // Szűrt rendelések
  const [searchName, setSearchName] = useState(''); // Szűrés név alapján
  const [searchEmail, setSearchEmail] = useState(''); // Szűrés email alapján
  const [searchLockerName, setSearchLockerName] = useState(''); // Szűrés locker név alapján
  const [searchLockerAddress, setSearchLockerAddress] = useState(''); // Szűrés locker cím alapján
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2); // Oldalonkénti rendelések száma

  useEffect(() => {
    // Fetch rendeléseket
    fetch(`${import.meta.env.VITE_BASE_URL}/orderslist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('usertoken')}`,
      },
    })
      .then(async (response) => {
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`❌ HTTP ${response.status} - ${errorText}`);
        }

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('✅ Érkezett rendelések:', data);
          setOrders(data);
          setFilteredOrders(data); // Kezdetben minden rendelést szűrt adatként tárolunk
        } else {
          throw new Error('❌ A válasz nem JSON');
        }
      })
      .catch((error) => {
        console.error('❗ Fetch hiba:', error.message);
      });
  }, []);

  const handleSearch = (event) => {
    const { name, value } = event.target;

    // Szűrési értékek beállítása
    if (name === 'searchName') {
      setSearchName(value);
    } else if (name === 'searchEmail') {
      setSearchEmail(value);
    } else if (name === 'searchLockerName') {
      setSearchLockerName(value);
    } else if (name === 'searchLockerAddress') {
      setSearchLockerAddress(value);
    }

    // Ha a szűrési mezők mind üresek, visszaállítjuk az összes rendelést
    if (!value) {
      setFilteredOrders(orders);
    } else {
      // Szűrjük a rendeléseket a megadott keresési feltételek alapján
      const filtered = orders.filter((order) => {
        const fullName = order.user
          ? `${order.user.first_name} ${order.user.last_name}`.toLowerCase()
          : '';

        const email = order.user && order.user.email
          ? order.user.email.toLowerCase()
          : '';

        // Csomagautomata adatok szűrése
        const lockerName = order.order_item && order.order_item[0] && order.order_item[0].locker && order.order_item[0].locker.locker_name
          ? order.order_item[0].locker.locker_name.toLowerCase()
          : '';

        const lockerAddress = order.order_item && order.order_item[0] && order.order_item[0].locker && order.order_item[0].locker.address
          ? order.order_item[0].locker.address.toLowerCase()
          : '';

        // Az összes szűrési feltétel alkalmazása
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
    navigate('/'); // Navigálás a főoldalra vagy másik oldalra
  };

  // Oldalra vonatkozó rendelet
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder); // Az aktuális oldal rendelések

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage); // Az összes oldal kiszámítása

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1); // Előző oldal
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1); // Következő oldal
  };

  // const handleDelete = (orderId) => {
  //   alert(`Rendelés törlése teszt: ${orderId}`);
  // };

  const handleDelete = async (orderId) => {
    try {
        // Küldd el a törlési kérelmet a backendhez a rendelés ID-jával a body-ban
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('usertoken')}`,
            },
            body: JSON.stringify({ order_id: orderId }) // A rendelés ID-t a body-ban küldjük
        });

        if (!response.ok) {
            //throw new Error('Hiba történt a rendelés törlésekor');
            toast.error('Hiba történt a rendelés törlésekor'); // Hibaüzenet
        }

        const data = await response.json();
        //alert(data.message); // Megjelenítjük a sikeres törlés üzenetet
        toast.success(data.message); // Sikeres törlés üzenet

        // Frissítsük a rendelési listát
        setOrders(orders.filter((order) => order.id !== orderId));
        setFilteredOrders(filteredOrders.filter((order) => order.id !== orderId));
    } catch (error) {
        console.error('Hiba történt a rendelés törlésében:', error);
        //alert('Hiba történt a rendelés törlésében');
        toast.error('Hiba történt a rendelés törlésében'); // Hibaüzenet
    }
};

  return (
    <div className="bg-base-200 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">Megrendelések</h1>

      <div className="flex flex-row">
        {/* Bal oldali kereső + Szűrők */}
        <div className="w-[20%] p-4">
          <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>

          {/* Keresés neve szerint */}
          <div className="form-control mb-4">
            <input
              type="text"
              name="searchName"
              value={searchName}
              onChange={handleSearch}
              placeholder="Keresés név szerint"
              className="input input-bordered w-full input-primary"
            />
          </div>

          {/* Keresés email cím szerint */}
          <div className="form-control mb-4">
            <input
              type="text"
              name="searchEmail"
              value={searchEmail}
              onChange={handleSearch}
              placeholder="Keresés email szerint"
              className="input input-bordered w-full input-primary"
            />
          </div>

          {/* Keresés locker neve szerint */}
          <div className="form-control mb-4">
            <input
              type="text"
              name="searchLockerName"
              value={searchLockerName}
              onChange={handleSearch}
              placeholder="Keresés csomagautomata neve szerint"
              className="input input-bordered w-full input-primary"
            />
          </div>

          {/* Keresés locker cím szerint */}
          <div className="form-control mb-4">
            <input
              type="text"
              name="searchLockerAddress"
              value={searchLockerAddress}
              onChange={handleSearch}
              placeholder="Keresés csomagautomata cím szerint"
              className="input input-bordered w-full input-primary"
            />
          </div>
        </div>

        {/* Jobb oldali rendeléseket tartalmazó kártyák */}
        <div className="flex flex-wrap justify-start gap-4 w-[80%] p-4">
          {currentOrders.map((order) => (
            <AdminOrdersCard key={order.id} order={order} handleDelete={handleDelete} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="join flex justify-center mt-4">
        <button
          className="join-item btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn btn-info">
          Oldal {currentPage} / {totalPages}
        </button>
        <button
          className="join-item btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>

      {/* Bezárás gomb */}
      <div className="card-actions justify-end mt-6">
        <button className="btn btn-primary btn-circle absolute right-2 top-20 text-info" onClick={handleClose}>
        ✕
        </button>
      </div>
    </div>
  );
}

export default AdminOrders;