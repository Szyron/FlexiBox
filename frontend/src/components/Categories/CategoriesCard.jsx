import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import secureStorage from '../../utils/secureStorage';
import InitialContext from "../../context/InitialContext";
import CrudContext from '../../context/CrudContext';

function CategoriesCard({ category }) {
    const user = secureStorage.getItem('user');
    const navigate = useNavigate();
    const { backendMuvelet } = useContext(CrudContext);
    const { update } = useContext(InitialContext);

    const modosit = () => {
        navigate("/newcategory", { state: { category } });
    }

    const torles = (category) => {
        const method = "DELETE";
        const url = `${import.meta.env.VITE_BASE_URL}/category/delete`;
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
            "categoryId": category.id,
        };
        const successMessage = "Kategória sikeresen törölve!";
        const errorMessage = "Nem sikerült a kategória törlése.";
        backendMuvelet(null, method, url, header, successMessage, errorMessage)
            .then(() => {
                update();
            })
            .catch((error) => {
                console.error("Hiba történt a törlés során:", error);
            });
    };


    return (
        <div className="card w-96 shadow-xl m-5 bg-base-100">
            <div className="card-body text-center">
                <h2 className="card-title justify-center text-primary">{category.name}</h2>
                <div className="card-actions justify-center">
                    {user ? (
                        <>
                            {user.isadmin >= 70 && <button className='btn btn-primary text-white' onClick={() => modosit(category)}>Módosítás</button>}
                            {user.isadmin >= 70 && <button className='btn btn-info text-white' onClick={() => torles(category)}>Törlés</button>}
                        </>
                    ) : null}

                </div>
            </div>
        </div>
    )
}

export default CategoriesCard