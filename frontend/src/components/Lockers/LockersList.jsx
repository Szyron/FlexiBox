import React from 'react';
import { useContext } from 'react';
import LockersCard from './LockersCard';
import ServiceContext from '../../context/ServiceContext';

function LockersList() {

  const { lockers } = useContext(ServiceContext);

  return (
    <div className="bg-base-200 min-h-screen">
      <h1 className="text text-3xl font-bold text-center p-10 text-primary">Összes Csomagautómata</h1>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {
          lockers.map((locker) => (<LockersCard key={locker.id} locker={locker} />))
        }

      </div>
    </div>
  )
}

export default LockersList;