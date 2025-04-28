import { useState } from 'react';

const AdminOrdersCard = ({ order, handleDelete }) => {

  const [isItemsOpen, setIsItemsOpen] = useState(false);

  return (
    <div className="card bg-base-100 shadow-lg rounded-xl mb-6 m-4">
    <div className="card-body space-y-4">
      {/* Azonosító */}
      <p className="text-info text-xl font-bold">Azonosító: #{order.id}</p>
      <div className="divider divider-primary text-primary"></div>

      {/* Megrendelő adatai */}
      <div>
        <p className="font-semibold text-info">Megrendelő:</p>
        <p className="text-secondary">{order.user.first_name} {order.user.last_name}</p>
        <p className="text-sm text-secondary">{order.user.email}</p>
      </div>

      {/* Számlázási cím */}
      <div>
        <p className="font-semibold text-info">Számlázási cím</p>
        <p className="text-secondary">
          {order.address.zip} {order.address.city}, {order.address.street} {order.address.house_number}. {order.address.streettype.public_area_name}
        </p>
      </div>

      {/* Rendelés összesen */}
      <div className="text-lg font-semibold text-secondary">
        <p className="font-semibold text-info">Rendelés összesen:</p>
        <p>Összeg: {order.total} Ft</p>
      </div>

      {/* Rendelési tételek */}
      {order.order_item && order.order_item.length > 0 && (
        <div className="bg-white rounded-lg p-3 border border-base-200">
          {/* Csak mobilon jelenik meg a "Tételek megtekintése" gomb */}
          <div className="lg:hidden">
            <button
              className="btn btn-primary w-full text-center"
              onClick={() => setIsItemsOpen(!isItemsOpen)} // Váltja az állapotot
            >
              {isItemsOpen ? 'Tételek elrejtése' : 'Tételek megtekintése'}
            </button>
          </div>
          
          {/* Rendelési tételek listája, ha a "Tételek megtekintése" gomb ki van nyitva */}
          {isItemsOpen && (
            <div>
              <h3 className="font-semibold mb-2">🧾 Rendelési tételek:</h3>
              {order.order_item.map((item, idx) => (
                <div key={idx} className="mb-2 border-b border-dashed pb-2 last:border-none last:pb-0">
                  <p><span className="font-medium">Csomagautómata:</span> {item.locker ? item.locker.locker_name : 'Nincs hozzárendelt locker'}</p>
                  <p><span className="font-medium">Csomagautómata címe:</span> {item.locker ? item.locker.address : 'Nincs hozzárendelt locker'}</p>
                  <p><span className="font-medium">Termék ID:</span> {item.product_id}</p>
                  <p><span className="font-medium">Ár:</span> {item.item_price} Ft</p>
                  <p><span className="font-medium">Darab:</span> {item.quantity}</p>
                  <p><span className="font-medium">Összeg:</span> {item.line_total} Ft</p>
                </div>
              ))}
            </div>
          )}
          {/* Ha nem mobilon nézik, akkor mindig láthatóak a rendelési tételek */}
          <div className="hidden lg:block">
            <h3 className="font-semibold mb-2">🧾 Rendelési tételek:</h3>
            {order.order_item.map((item, idx) => (
              <div key={idx} className="mb-2 border-b border-dashed pb-2 last:border-none last:pb-0">
                <p><span className="font-medium">Csomagautómata:</span> {item.locker ? item.locker.locker_name : 'Nincs hozzárendelt locker'}</p>
                <p><span className="font-medium">Csomagautómata címe:</span> {item.locker ? item.locker.address : 'Nincs hozzárendelt locker'}</p>
                <p><span className="font-medium">Termék ID:</span> {item.product_id}</p>
                <p><span className="font-medium">Ár:</span> {item.item_price} Ft</p>
                <p><span className="font-medium">Darab:</span> {item.quantity}</p>
                <p><span className="font-medium">Összeg:</span> {item.line_total} Ft</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Törlés gomb */}
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