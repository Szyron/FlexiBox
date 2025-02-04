import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartView() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

    

  return (
    <div className='container min-h-screen mx-auto bg-base-200'>
  <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold mt-10">Kosár</h1>
    <Link to="/" className="self-end mt-10 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
      Close
    </Link>
  </div>
  <div className="flex flex-col md:flex-row justify-center items-start">
    <div className="w-full md:w-3/4">
      {cartItems.map((item) => (
        <div className="flex flex-col md:flex-row justify-between items-center rounded-box bg-base-100 m-5" key={item.id}>
          <div className="flex gap-4">
            <img src='https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp' alt="termék kép" className="rounded-md h-24 w-24 object-cover" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{item.name}</h1>
              <p className="text-gray-600">{item.price_per_day}</p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => { addToCart(item) }}>
              +
            </button>
            <p>{item.quantity}</p>
            <button className="mr-2 px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700" onClick={() => { removeFromCart(item) }}>
              -
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="w-full md:w-1/4 p-4 sticky top-0">
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Kosár</h2>
          {cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Total: ${getCartTotal()}</h1>
              <button className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase rounded hover:bg-red-700 focus:outline-none focus:bg-red-700" onClick={() => { clearCart() }}>
                Clear cart
              </button>
              <Link to="/" className="m-2 px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-green-700 focus:outline-none focus:bg-green-700">
                Megrendel
              </Link>
            </div>
          ) : (
            <h1 className="text-lg font-bold">Your cart is empty</h1>
          )}
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default CartView;
