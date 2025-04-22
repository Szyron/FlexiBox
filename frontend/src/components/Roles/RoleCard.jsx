import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import secureStorage from '../../utils/secureStorage';
import AuthContext from '../../context/AuthContext';


function RoleCard({ role }) {
  const user = secureStorage.getItem('user');
  const navigate = useNavigate();
  const { backendMuveletRole } = useContext(AuthContext);

  const modosit = () => {
    navigate("/newrole", { state: { role } });
  }

  const torles = (role) => {
    backendMuveletRole(
      role,
      "DELETE",
      `${import.meta.env.VITE_BASE_URL}/role/delete`,
      {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
        "RoleId": role.id
      }
    );
  }

  return (
    <div className="card w-96 shadow-xl m-5 bg-base-100">
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-primary">{role.warrant_name}</h2>
        <div className="card-actions justify-center">
          {user ? (
            <>
              {user.isadmin >= 70 && <button className='btn btn-primary text-white' onClick={() => modosit(role)}>Módosítás</button>}
              {user.isadmin >= 70 && <button className='btn btn-info text-white' onClick={() => torles(role)}>Törlés</button>}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default RoleCard