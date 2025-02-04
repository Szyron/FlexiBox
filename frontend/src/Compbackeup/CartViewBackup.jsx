import React from "react";
import { useLocation } from "react-router-dom";

function CartView() {
  const { state } = useLocation();
  const { product } = state;

  console.log(product);
  return (
    <div>
      <h1 className="text text-3xl font-bold text-center">Kosár</h1>
      <div className="flex flex-row justify-center">
        <div className="card bg-base-100 w-[70%] shadow-xl m-5">
          <div className="card-body">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <h2 className="card-title font-bold">Tereméknév</h2>
                <h2 className="card-title font-bold">Bérlési ár</h2>
              </div>
              <div className="flex flex-row justify-between items-center mt-4">
                <h2 className="card-title">{product.name}</h2>
                <h2 className="card-title">{product.price_per_day}</h2>
                <div className="flex flex-row items-center">
                  <button className="border bg-error rounded-md py-2 px-4 mr-2">
                    -
                  </button>
                  <span className="text-center w-8">1</span>
                  <button className="border bg-success rounded-md py-2 px-4 ml-2">
                    +
                  </button>
                  <button className="border bg-warning rounded-md py-2 px-4 ml-2">
                    X
                  </button>
                </div>
              </div>
            </div>
            <div className="card-actions justify-end mt-4"></div>
          </div>
        </div>
        <div className="card bg-base-100 w-[30%] shadow-xl m-5">
          <div className="card-body">
            <div className="">
              <div className="flex flex-col">
                <h2 className="card-title font-bold">Total</h2>
                <h2 className="card-title">{product.price_per_day}</h2>
              </div>
            </div>
            <div className="card-actions justify-end mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartView;
