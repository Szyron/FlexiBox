import { useContext, useState, useEffect } from "react";
import ProductsCard from "./ProductsCard";
import InitialContext from "../../context/InitialContext";

function ProductsList() {
  const { products, lockers, categories } = useContext(InitialContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCitys, setFilteredCities] = useState("");
  const [filteredCategories, setFilteredCategories] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const [isFilterOpen, setIsFilterOpen] = useState(false);//Mobil szűrőpanel beúszása

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

  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(product.price_per_day).toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.available ? "Elérhető" : "Nem elérhető").toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredCitys !== "") {
      filtered = filtered.filter((product) =>
        product.lockers.some((locker) => locker.id === parseInt(filteredCitys))
      );
    }
    if (filteredCategories !== "") {
      filtered = filtered.filter((product) => product.category.id === parseInt(filteredCategories));
    }
    if (minPrice !== null && maxPrice !== null) {
      filtered = filtered.filter(
        (product) =>
          product.price_per_day >= minPrice && product.price_per_day <= maxPrice
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, filteredCitys, products, filteredCategories, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-base-200 min-h-screen p-4">
    {/* Cím */}
    <h1 className="text-3xl font-bold text-center pb-10 mb-4 text-primary">
      Elérhető Termékek
    </h1>
  
    {/* Hamburger Menü Ikon (mobilon) */}
    <button
      onClick={() => setIsFilterOpen(true)}
      className="lg:hidden fixed bottom-4 right-4 p-2 rounded-full bg-primary text-white shadow-lg z-50"
    >
      <svg
        fill="none"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5,3V17M12,7V21m7-7v7m0-11V3"
          className="stroke-[#005c6a] fill-none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M5,17a2,2,0,1,0,2,2A2,2,0,0,0,5,17ZM12,3a2,2,0,1,0,2,2A2,2,0,0,0,12,3Zm7,7a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z"
          className="stroke-[#2ca9bc] fill-none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  
    {/* Szűrőpanel - mobilra */}
    <div
      className={`fixed top-0 right-0 w-64 h-full bg-base-100 shadow-lg transform transition-transform z-50 ${
        isFilterOpen ? "translate-x-0" : "translate-x-full"
      } lg:hidden`}
    >
      <div className="p-4">
        <button
          className="btn btn-sm btn-circle btn-outline mb-4"
          onClick={() => setIsFilterOpen(false)}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary">Szűrők</h2>
        <div className="form-control mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Keresés termékek között"
            className="input input-bordered w-full input-primary placeholder-info"
          />
        </div>
        <div className="form-control mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Csomagautomata</h1>
          <select
            className="select select-bordered w-full select-primary text-info"
            onChange={(e) => setFilteredCities(e.target.value)}
            value={filteredCitys}
          >
            <option value="">Válassz csomagautomatát</option>
            {lockers.map((locker) => (
              <option key={locker.id} value={locker.id}>
                {locker.locker_name} - {locker.address}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Kategória</h1>
          <select
            className="select select-bordered w-full select-primary text-info"
            onChange={(e) => setFilteredCategories(e.target.value)}
            value={filteredCategories}
          >
            <option value="">Válassz kategóriát</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Ár (Ft / nap)</h1>
          <label className="label text-info">
            <span className="label-text">Minimum: {minPrice} Ft</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={10}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="range range-primary"
          />
          <label className="label text-info mt-2">
            <span className="label-text">Maximum: {maxPrice} Ft</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range range-secondary"
          />
        </div>
      </div>
    </div>
  
    {/* Tartalom - rugalmas elrendezés */}
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Szűrők (asztali nézet) */}
      <div className="hidden lg:block w-[20%] p-4">
        <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>
        <div className="form-control mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Keresés termékek között"
            className="input input-bordered w-full input-primary placeholder-info"
          />
        </div>
        <div className="form-control mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Csomagautomata</h1>
          <select
            className="select select-bordered w-full select-primary text-info"
            onChange={(e) => setFilteredCities(e.target.value)}
            value={filteredCitys}
          >
            <option value="">Válassz csomagautomatát</option>
            {lockers.map((locker) => (
              <option key={locker.id} value={locker.id}>
                {locker.locker_name} - {locker.address}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Kategória</h1>
          <select
            className="select select-bordered w-full select-primary text-info"
            onChange={(e) => setFilteredCategories(e.target.value)}
            value={filteredCategories}
          >
            <option value="">Válassz kategóriát</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control mt-4 mb-4">
          <h1 className="font-bold mb-2 text-left text-primary">Ár (Ft / nap)</h1>
          <label className="label text-info">
            <span className="label-text">Minimum: {minPrice} Ft</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={10}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="range range-primary"
          />
          <label className="label text-info mt-2">
            <span className="label-text">Maximum: {maxPrice} Ft</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="range range-secondary"
          />
        </div>
      </div>
  
      {/* Termékkártyák */}
      <div className="w-full lg:w-4/5 flex flex-wrap justify-center gap-4">
        {paginatedProducts.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  
    {/* Lapozás */}
    <div className="join flex justify-center mt-10">
      <button
        className="join-item btn btn-secondary"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        «
      </button>
      <button className="join-item btn btn-primary text-white">
        Oldal {currentPage} / {totalPages}
      </button>
      <button
        className="join-item btn btn-secondary"
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
