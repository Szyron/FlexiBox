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
<div className="bg-base-200 min-h-screen p-4">
  <h1 className="text-3xl font-bold text-center mb-4 text-primary">Elérhető Termékek</h1>

  <div className="flex flex-row">
    {/* Bal oldali kereső + Szűrők szöveg */}
    <div className="w-[20%] p-4">
      <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>
      <div className="form-control">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Keresés..."
          className="input input-bordered w-full"
        />
      </div>
    </div>

    {/* Jobb oldali termékek */}
    <div className="flex flex-wrap justify-start gap-4 w-[80%] p-4">
      {filteredProducts.map((product) => (
        <ProductsCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</div>
  );
}

export default ProductsList;
