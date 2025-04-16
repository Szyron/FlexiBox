import React from 'react';

const AdminOrdersCard = ({ order, handleDelete }) => {
    
  return (
    <div className="card bg-base-100 shadow-lg rounded-xl mb-6">
    <div className="card-body space-y-4">

      <div>
        <p className="font-semibold">👤 Megrendelő:</p>
        <p>{order.user.first_name} {order.user.last_name}</p>
        <p className="text-sm text-gray-500">{order.user.email}</p>
      </div>

      <div>
        <p className="font-semibold">📍 Szállítási cím:</p>
        <p>{order.address.street} {order.address.house_number}, {order.address.zip}</p>
      </div>

      <div className="text-lg font-semibold text-primary">
        Összeg: {order.total} Ft
      </div>

      {order.order_item && order.order_item.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-base-200">
          <h3 className="font-semibold mb-2">🧾 Rendelési tételek:</h3>
          {order.order_item.map((item, idx) => (
            <div key={idx} className="mb-2 border-b border-dashed pb-2 last:border-none last:pb-0">
              <p><span className="font-medium">Csomagautómata:</span> {item.locker ? item.locker.locker_name : 'Nincs hozzárendelt locker'}</p>
              <p><span className="font-medium">Termék ID:</span> {item.product_id}</p>
              <p><span className="font-medium">Ár:</span> {item.item_price} Ft</p>
              <p><span className="font-medium">Darab:</span> {item.quantity}</p>
              <p><span className="font-medium">Összeg:</span> {item.line_total} Ft</p>
            </div>
          ))}
        </div>
      )}

      <div className="card-actions justify-end mt-2">
        <button
          className="btn btn-error text-white"
          onClick={() => handleDelete(order.id)}
        >
          Törlés
        </button>
      </div>

    </div>
  </div>
  );
};

export default AdminOrdersCard;