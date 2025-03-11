import React from 'react'
import { useState, useEffect } from 'react'

function UserOrder() {

  const user = JSON.parse(sessionStorage.getItem('user'))
  const [orders, setOrders] = useState([])
  
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
    .then(data => setOrders(data))
    .catch((error) => {
      console.error('Error:', error)
    })
  }
  , [])

 console.log(orders);





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

<div className="card bg-base-100 w-96 shadow-sm">
<figure>
  <img
    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
    alt="Shoes"
  />
</figure>
<div className="card-body">
  <h2 className="card-title">Megrendelés Adatai:</h2>

  {/* Ellenőrizzük, hogy az orders tömb nem üres */}
  {Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order, index) => (
      <div key={index}>
        {/* Felhasználói adatok */}
        <p>Megrendelő neve: {order.user.first_name} {order.user.last_name}</p>
        <p>Megrendelő email címe: {order.user.email}</p>
        
        {/* Cím adatai */}
        <p>Megrendelő címe: {order.address.street} {order.address.house_number}, {order.address.zip}</p>
        
        {/* Rendelés összeg */}
        <p>Összeg: {order.total}</p>
        
        {/* A rendeléshez tartozó tételek */}
        {order.order_item && order.order_item.length > 0 && (
          <div>
            <h3>Rendelési tételek:</h3>
            {order.order_item.map((item, idx) => (
              <div key={idx}>
                <p>Termék ID: {item.product_id}</p>
                <p>Ár: {item.item_price} Ft</p>
                <p>Darab: {item.quantity}</p>
                <p>Rendelési összeg: {item.line_total} Ft</p>
              </div>
            ))}
          </div>
        )}
      </div>
    ))
  ) : (
    <p>Nincs rendelés.</p>
  )}

  <div className="card-actions justify-end">
    <button className="btn btn-primary">Bezárás</button>
  </div>
</div>
</div>
  )
}

export default UserOrder