import { useState, useEffect, useContext } from 'react';
import LockersCard from './LockersCard';
import ServiceContext from '../../context/ServiceContext';

function LockersList() {
  const { lockers } = useContext(ServiceContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLockers, setFilteredLockers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredLockers.length / itemsPerPage);
  const [isFilterOpen, setIsFilterOpen] = useState(false);//Mobil szűrőpanel beúszása

  const paginatedLockers = filteredLockers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const filtered = lockers.filter((locker) =>
      locker.locker_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(locker.address).toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLockers(filtered);
    setCurrentPage(1);
  }, [searchQuery, lockers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-base-200 min-h-screen p-4">
      {/* Cím */}
      <h1 className="text-3xl font-bold text-center pb-10 mb-4 text-primary">
        Összes Csomagautomata
      </h1>

      {/* Hamburger Menü Ikon (mobilon) */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden fixed bottom-20 right-1 p-2 rounded-full bg-primary text-white shadow-lg z-50"
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

      {/* Szűrőpanel */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-base-100 shadow-lg transform transition-transform z-50 ${isFilterOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}  // Eltávolítottuk a lg:block osztályt
      >

        <div className="p-4">
          <div className="flex justify-end">
            <button
              className="text-primary font-bold text-xl mb-4"
              onClick={() => setIsFilterOpen(false)}
            >
              ✕
            </button>
          </div>
          <h2 className="text-xl font-bold mb-4 text-primary text-center">Szűrők</h2>
          <div className="form-control">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Keresés..."
              className="input input-bordered w-full border-primary text-info"
            />
          </div>
        </div>
      </div>

      {/* Tartalom */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Szűrők bal oldalon (asztali nézet) */}
        <div className="hidden lg:block w-[20%] p-4">
          <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>
          <div className="form-control relative">
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#50c6c9]"><line x1="20" y1="20" x2="14.95" y2="14.95" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="20.5" y1="20.5" x2="17" y2="17" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="10" cy="10" r="7" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Keresés csomagautomatára"
              className="input input-primary w-full border-primary placeholder-info pl-10"
            />
          </div>
        </div>

        {/* Kártyák */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto pr-6">
          {paginatedLockers.map((locker) => (
            <LockersCard key={locker.id} locker={locker} />
          ))}
        </div>
      </div>

      {/* Lapozás */}
      <div className="join flex justify-center mt-10 mb-24">
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

export default LockersList;