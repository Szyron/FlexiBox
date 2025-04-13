import React from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import OrderContext from "../../context/OrderContext";
import TermofUseInfo from "./TermofUseInfo";
import ServiceContext from "../../context/ServiceContext";

function CartView() {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } =
    useContext(CartContext);

  const { lockers } = useContext(ServiceContext);

    
    const {isPrivacyInfo, openPrivacyInfo, closePrivacyInfo} = useContext(OrderContext);

    

  return (
    <div className="min-h-screen mx-auto bg-base-200">
  <div className="flex flex-col items-center">
    <h1 className="text-3xl font-bold mt-10 text-primary">Kosár</h1>

  </div>
  <div className="flex flex-col md:flex-row justify-center items-start">
    <div className="w-full md:w-3/4">
      {cartItems.map((item) => (
        <div className="flex flex-col md:flex-row justify-between items-center rounded-box bg-base-100 m-5" key={item.id}>
          <div className="flex gap-4">
            <img src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${item.file_path}`} alt="termék kép" className="rounded-md h-24 w-24 object-cover" />
            <div className="flex flex-col">
              <h1 className="text-lg font-bold">{item.name}</h1>
              <p className="text-gray-600">{item.price_per_day}</p>
              <p className="text-gray-600">
                {
                  lockers.find(locker => locker.id === Number(item.lockerId))?.locker_name || "Ismeretlen átvevőpont"
                }
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <button className="px-4 py-2 rounded hover:bg-base-200 focus:outline-none" onClick={() => { addToCart(item) }}>
              <svg width="25px" height="25px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>plus_circle [#1425]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-259.000000, -600.000000)" fill="#50c6c9"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M214.55,449 L217.7,449 L217.7,451 L214.55,451 L214.55,454 L212.45,454 L212.45,451 L209.3,451 L209.3,449 L212.45,449 L212.45,446 L214.55,446 L214.55,449 Z M213.5,458 C208.86845,458 205.1,454.411 205.1,450 C205.1,445.589 208.86845,442 213.5,442 C218.13155,442 221.9,445.589 221.9,450 C221.9,454.411 218.13155,458 213.5,458 L213.5,458 Z M213.5,440 C207.70085,440 203,444.477 203,450 C203,455.523 207.70085,460 213.5,460 C219.29915,460 224,455.523 224,450 C224,444.477 219.29915,440 213.5,440 L213.5,440 Z" id="plus_circle-[#1425]"> </path> </g> </g> </g> </g></svg>
            </button>
            <p className="mr-2 px-4 py-2 text-secondary font-bold">{item.quantity}</p>
            <button className="mr-2 px-4 py-2 rounded hover:bg-base-200 focus:outline-none" onClick={() => { removeFromCart(item) }}>
              <svg width="25px" height="25px" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>minus_circle [#1426]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-219.000000, -600.000000)" fill="#50c6c9"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M177.7,450 C177.7,450.552 177.2296,451 176.65,451 L170.35,451 C169.7704,451 169.3,450.552 169.3,450 C169.3,449.448 169.7704,449 170.35,449 L176.65,449 C177.2296,449 177.7,449.448 177.7,450 M173.5,458 C168.86845,458 165.1,454.411 165.1,450 C165.1,445.589 168.86845,442 173.5,442 C178.13155,442 181.9,445.589 181.9,450 C181.9,454.411 178.13155,458 173.5,458 M173.5,440 C167.70085,440 163,444.477 163,450 C163,455.523 167.70085,460 173.5,460 C179.29915,460 184,455.523 184,450 C184,444.477 179.29915,440 173.5,440" > </path> </g> </g> </g> </g></svg>
            </button>
          </div>
        </div>
      ))}
    </div>
    <div className="w-full md:w-1/4 p-4 sticky top-0">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {/* <h2 className="card-title">Összegzés</h2> */}
          {cartItems.length > 0 ? (
            <div className="flex flex-col justify-between items-center">
              <h1 className="text-lg font-bold">Összesen: {getCartTotal()} Ft</h1>
              <button className="px-4 py-2 bg-red-700 text-white text-xs font-bold uppercase rounded hover:bg-red-700 focus:outline-none focus:bg-red-700" onClick={() => { clearCart() }}>
                Teljes kosár kiürítése
              </button>
              <button onClick={()=>openPrivacyInfo()} className="m-2 px-4 py-2 bg-green-700 text-white text-xs font-bold uppercase rounded hover:bg-green-700 focus:outline-none focus:bg-green-700" >
                Tovább a pénztárhoz
              </button>
              <Link to="/" className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
              Kosár bezárása
            </Link>
              {
            isPrivacyInfo && (<TermofUseInfo  closeFunction={()=>closePrivacyInfo()} />)
            
        }
            </div>
          ) : (
            <h1 className="text-lg font-bold">Kosarad üres jelenleg.</h1>
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
