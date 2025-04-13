import {useState, useEffect} from 'react';
import { useContext } from 'react';
import LockersCard from './LockersCard';
import ServiceContext from '../../context/ServiceContext';

function LockersList() {

  const { lockers } = useContext(ServiceContext);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredLockers, setFilteredLockers] = useState([]);
  
    useEffect(() => {
      setFilteredLockers(
        lockers.filter((locker) =>
          locker.locker_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          String(locker.address).toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, [searchQuery, lockers]);
  
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <h1 className="text text-3xl font-bold text-center p-10 text-primary">Összes Csomagautómata</h1>
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
      <div className="flex flex-row flex-wrap items-center justify-center">
        {
          filteredLockers.map((locker) => (<LockersCard key={locker.id} locker={locker} />))
        }

      </div>
    </div>
    </div>
  )
}

export default LockersList;