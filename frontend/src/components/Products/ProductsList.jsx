import React from "react";
import { useContext } from "react";
import ProductsCard from "./ProductsCard";
import ServiceContext from "../../context/ServiceContext";

function ProductsList() {
  const { products } = useContext(ServiceContext);

  return (
    <div className="bg-base-200 min-h-screen">
      <h1 className="text text-3xl font-bold text-center">Termék Lista:</h1>
      <div className="form-control w-[18%] mx-auto">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
