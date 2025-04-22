import { useState, useEffect, useContext } from 'react';
import LockersCard from './LockersCard';
import ServiceContext from '../../context/ServiceContext';

function LockersList() {
  const { lockers } = useContext(ServiceContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLockers, setFilteredLockers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredLockers.length / itemsPerPage);

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
      <h1 className="text text-3xl font-bold text-center pb-10 mb-4 text-primary">Összes Csomagautomata</h1>
      <div className="flex flex-row">
        <div className="w-[20%] p-4">
          <h2 className="text-xl font-bold mb-2 text-center text-primary">Szűrők</h2>
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
        <div className="flex flex-row flex-wrap items-start justify-start w-[80%]">
          {paginatedLockers.map((locker) => (
            <LockersCard key={locker.id} locker={locker} />
          ))}
        </div>
      </div>
      <div className="join flex justify-center mt-6">
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