import React from 'react'
import { useState, useEffect } from 'react'
import secureStorage from '../../utils/secureStorage';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';


function UserOrder() {
  const navigate = useNavigate();
  //const user = JSON.parse(sessionStorage.getItem('user'))
  const user = secureStorage.getItem('user');
  const [orders, setOrders] = useState([])
  const { clearCart } = useContext(CartContext); // clearCart függvény a CartContext-ből
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/order`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('usertoken')}`,
        'UserId': user.id
      }
    })
    .then(response => response.json())
    .then(data => {setOrders(data);
      // Automatikusan töröljük a cartItems-t
      //sessionStorage.removeItem('cartItems');
      clearCart(); // A kosár ürítése a CartContext segítségével
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }
  , [])

 console.log(orders);

 const handleClose = () => {
  navigate('/'); // Navigálás a főoldalra vagy másik oldalra
};
  return (
//     <div className="card bg-base-100 w-96 shadow-sm">
//   <figure>
//     <img
//       src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//       alt="Shoes" />
//   </figure>
//   <div className="card-body">
//     <h2 className="card-title">Megrendelés Adatai:</h2>
//     <p>Megrendelő neve:</p>
//     {orders.map((order, index) => (
//           <div key={index}>
//             <p>Megrendelő neve: {order.user.first_name}</p>
//             <p>Megrendelő email címe: {order.user.email}</p>
//             <p>Megrendelő címe: {order.address.street}</p>
//           </div>
//         ))}
        
//     <div className="card-actions justify-end">
//       <button className="btn btn-primary">Bezárás</button>
//     </div>
//   </div>
// </div>
<div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
  <div className="card w-full max-w-xl bg-base-100 shadow-lg rounded-2xl p-4">
    <p className="text-info text-xl font-bold">Azonosító: #{order.id}</p>
    <div className="divider divider-primary text-primary"></div>
    <div className="card-body space-y-4">
      <h2 className="card-title text-xl font-bold text-primary">Megrendelés Adatai</h2>

      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="border-t border-base-200 pt-4 space-y-3">
            <div>
              <p className="font-semibold text-info">Megrendelő:</p>
              <p className="text-secondary">{order.user.first_name} {order.user.last_name}</p>
              <p className="text-sm text-secondary">{order.user.email}</p>
            </div>

            <div>
              <p className="font-semibold text-info">Számlázási cím</p>
              <p className="text-secondary">{order.address.zip} {order.address.city}, {order.address.street} {order.address.house_number}. {order.address.streettype.public_area_name}</p>
            </div>

            <div className="text-lg font-semibold text-secondary">
              <p className="font-semibold text-info">Rendelés összesen:</p>
              Összeg: {order.total} Ft
            </div>

            {order.order_item && order.order_item.length > 0 && (
              <div className="bg-white rounded-lg p-3 border border-base-200">
                <h3 className="font-semibold mb-2">🧾 Rendelési tételek:</h3>
                {order.order_item.map((item, idx) => (
                  <div key={idx} className="mb-2 border-b border-dashed pb-2 last:border-none last:pb-0">
                    <p><span className="font-medium">Csomagautómata neve:</span> {item.locker ? item.locker.locker_name : 'Nincs hozzárendelt locker'}</p>
                    <p><span className="font-medium">Csomagautómata címe:</span> {item.locker ? item.locker.address : 'Nincs hozzárendelt locker'}</p>
                    <p><span className="font-medium">Termék azonosító :</span> {item.product_id}</p>
                    <p><span className="font-medium">Ár:</span> {item.item_price} Ft</p>
                    <p><span className="font-medium">Darab:</span> {item.quantity}</p>
                    <p><span className="font-medium">Összeg:</span> {item.line_total} Ft</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-error">❌ Nincs rendelés.</p>
      )}

      <div className="card-actions justify-end">
        <button className="btn btn-primary text-white" onClick={handleClose}>Bezárás</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default UserOrder