import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ServiceContext from '../../context/ServiceContext';
import secureStorage from '../../utils/secureStorage';

function CategoriesCard({ category }) {
    //const user = JSON.parse(sessionStorage.getItem('user'));
    const user = secureStorage.getItem('user');
    const navigate = useNavigate();
    const { backendMuvelet } = useContext(ServiceContext);

    const modosit = () => {
        navigate("/newcategory", { state: { category } });
    }

    const torles = (category) => {
        backendMuvelet(
            category,
             "DELETE", 
            `${import.meta.env.VITE_BASE_URL}/category/delete`,
            { "Content-type": "application/json" , 
                "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
              "categoryId" : category.id} 
        );
    }


    return (
        <div className="card w-96 shadow-xl m-5 bg-secondary">
            <div className="card-body text-center">
                <h2 className="card-title justify-center">{category.name}</h2>
                <div className="card-actions justify-center">
                    {user ? (
                        <>
                            {user.isadmin >= 70 && <button className='btn btn-primary' onClick={() => modosit(category)}>Módosítás</button>}
                            {user.isadmin >= 70 && <button className='btn btn-error' onClick={() => torles(category)}>Törlés</button>}
                        </>
                    ) : null}

                </div>
            </div>
        </div>
    )
}

export default CategoriesCard