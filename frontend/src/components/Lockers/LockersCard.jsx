import LockerKep from '../../img/test_locker.png';
import LockerInfo from './LockerInfo';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import secureStorage from "../../utils/secureStorage";
import ServiceContext from "../../context/ServiceContext";

function LockersCard({ locker }) {
  const [isInfo, setInfo] = useState(false);
  const user = secureStorage.getItem("user");
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(ServiceContext);

  const modosit = (locker) => {
    navigate("/newlocker", { state: { locker } });
  };

  const torles = (locker) => {
    backendMuvelet(
      locker,
      "DELETE",
      `${import.meta.env.VITE_BASE_URL}/locker/delete`,
      {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
        "lockerId": locker.id
      }
    );
  };

  const openInfo = () => setInfo(true);
  const closeInfo = () => setInfo(false);

  return user?.isadmin >= 70 ? (
    <div className="card bg-base-100 w-96 shadow-sm m-5">
      <figure className="px-10 pt-10">
        <img src={LockerKep} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{locker.locker_name}</h2>
        <p>{locker.address}</p>
        <div className="card-actions">
          {isInfo && (
            <LockerInfo
              locker={locker}
              closeFunction={closeInfo}
            />
          )}
          <button className="btn btn-primary text-white" onClick={() => modosit(locker)}>
            Módosítás
          </button>
          <button className="btn btn-info text-white" onClick={() => torles(locker)}>
            Törlés
          </button>
          <button className="btn btn-primary">Elérhető Termékek</button>
          <button className="btn btn-secondary text-white" onClick={openInfo}>
            Info
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-gray-800 text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🔧 Fejlesztés alatt</h1>
      <p className="text-lg">Az autómaták oldal jelenleg fejlesztés alatt áll. Nézz vissza később! 🚧</p>
    </div>
  );
}

export default LockersCard;
