import React from "react";
import { useContext } from "react";
import ProductsCard from "./ProductsCard";
import ServiceContext from "../../context/ServiceContext";
import { useState, useEffect } from "react";

function ProductsList() {
  const { products } = useContext(ServiceContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(product.price_per_day).toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.name.toLowerCase().includes(searchQuery.toLowerCase())||
        //String(product.available).toLowerCase().includes(searchQuery.toLowerCase())
        (product.available ? "Elérhető" : "Nem elérhető").toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
};


  return (
    <div className="bg-base-200 min-h-screen">
      <h1 className="text text-3xl font-bold text-center">Termék Lista:</h1>
      <div className="form-control w-[18%] mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
      </div>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {filteredProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
