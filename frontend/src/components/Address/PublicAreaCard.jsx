import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AddressContext from '../../context/AddressContext';

function PublicAreaCard({publicarea}) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const { backendMuvelet } = useContext(AddressContext);

    const modosit = () => {
        navigate("/newpublicarea", { state: { publicarea } });
    }

    const torles = (publicarea) => {
        backendMuvelet(
            publicarea,
             "DELETE", 
            `${import.meta.env.VITE_BASE_URL}/publicareaname/delete`,
            { "Content-type": "application/json" , 
                "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
              "StreetTypeId" : publicarea.id} 
        );
    }

  return (
    <div className="card w-96 shadow-xl m-5 bg-secondary">
    <div className="card-body text-center">
        <h2 className="card-title justify-center">{publicarea.public_area_name}</h2>
        <div className="card-actions justify-center">
            {user ? (
                <>
                    {user.isadmin >= 70 && <button className='btn btn-primary' onClick={() => modosit(publicarea)}>Módosítás</button>}
                    {user.isadmin >= 70 && <button className='btn btn-error' onClick={() => torles(publicarea)}>Törlés</button>}
                </>
            ) : null}

        </div>
    </div>
</div>
  )
}

export default PublicAreaCard