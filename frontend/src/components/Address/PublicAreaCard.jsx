import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AddressContext from "../../context/AddressContext";
import secureStorage from "../../utils/secureStorage";
import CrudContext from "../../context/CrudContext";
import InitialContext from "../../context/InitialContext";



function PublicAreaCard({publicarea}) {
    const user = secureStorage.getItem("user");
    const navigate = useNavigate();
    //const { backendMuvelet } = useContext(AddressContext);
    const { backendMuvelet } = useContext(CrudContext);
    const { updatePublicAreaName } = useContext(InitialContext);
  
    const modosit = () => {
      navigate("/newpublicarea", { state: { publicarea } });
    };
  
    const torles = (publicarea) => {
      const method = "DELETE";
      const url = `${import.meta.env.VITE_BASE_URL}/publicareaname/delete`;
      const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
        StreetTypeId: publicarea.id,
      };
      const successMessage = "Közterület sikeresen törölve!";
      const errorMessage = "Nem sikerült a közterület törlése.";
      updatePublicAreaName();
      backendMuvelet(null, method, url, header, successMessage, errorMessage);
    };

  return (
    <div className="card w-96 shadow-xl m-5 bg-base-100">
    <div className="card-body text-center">
        <h2 className="card-title justify-center">{publicarea.public_area_name}</h2>
        <div className="card-actions justify-center">
            {user ? (
                <>
                    {user.isadmin >= 70 && <button className='btn btn-primary text-white' onClick={() => modosit(publicarea)}>Módosítás</button>}
                    {user.isadmin >= 70 && <button className='btn btn-info text-white' onClick={() => torles(publicarea)}>Törlés</button>}
                </>
            ) : null}

        </div>
    </div>
</div>
  )
}

export default PublicAreaCard