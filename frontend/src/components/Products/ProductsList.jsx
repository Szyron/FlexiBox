import React from "react";
import { useContext } from "react";
import ProductsCard from "./ProductsCard";
import ServiceContext from "../../context/ServiceContext";
import { useState, useEffect } from "react";

function ProductsList() {
  const { products, lockers } = useContext(ServiceContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCitys, setFilteredCities] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage => currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage => currentPage + 1);
  }

  /*   useEffect(() => {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(product.price_per_day).toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.name.toLowerCase().includes(searchQuery.toLowerCase())||
          //String(product.available).toLowerCase().includes(searchQuery.toLowerCase())
          (product.available ? "Elérhető" : "Nem elérhető").toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [searchQuery, products]); */

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(product.price_per_day).toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.available ? "Elérhető" : "Nem elérhető").toLowerCase().includes(searchQuery.toLowerCase())
    );

    /*     if (filteredCitys) {
          filtered = filtered.filter((product) => product.locker.id === parseInt(filteredCitys));
        } */
    if (filteredCitys !== "") {
      filtered = filtered.filter((product) =>
        product.lockers.some((locker) => locker.id === parseInt(filteredCitys))
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filteredCitys, products]);

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

          {/* Termék kereső */}
          <div className="form-control mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Keresés termékek között"
              className="input input-bordered w-full input-primary"
            />
          </div>

          {/* Csomagautomata választó */}
          <div className="form-control">
            <h3 className="font-bold mb-2 text-left text-primary">Csomagautomata</h3>
            <select
              className="select select-bordered w-full select-primary"
              onChange={(e) => setFilteredCities(e.target.value)}
              value={filteredCitys}
            >
              <option value="">Összes</option>
              {lockers.map((locker) => (
                <option key={locker.id} value={locker.id}>
                  {locker.locker_name} - {locker.address}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Jobb oldali termékek */}
        <div className="flex flex-wrap justify-start gap-4 w-[80%] p-4">
          {paginatedProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className="join flex justify-center mt-4">
        <button
          className="join-item btn btn-primary"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn btn-info">
          Oldal {currentPage} / {totalPages}
        </button>
        <button
          className="join-item btn btn-primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
