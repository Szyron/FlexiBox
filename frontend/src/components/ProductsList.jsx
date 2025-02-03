import React from "react";
import { useContext } from "react";
import ProductsCard from "./ProductsCard";
import ServiceContext from "../context/ServiceContext";

function ProductsList() {
  const { products } = useContext(ServiceContext);

  return (
    <div className="bg-secondary min-h-screen">
      <h1 className="text text-3xl font-bold text-center">Termék Lista:</h1>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {products.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
