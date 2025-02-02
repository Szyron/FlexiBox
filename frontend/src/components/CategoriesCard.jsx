import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import ServiceContext from '../context/ServiceContext';

function CategoriesCard({ category }) {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const navigate = useNavigate();
    const { backendMuvelet } = useContext(ServiceContext);

    const modosit = () => {
        navigate("/newcategory", { state: { category } });
    }

    const torles = (category) => {
        backendMuvelet(category, "DELETE", `${import.meta.env.VITE_BASE_URL}/category/${category.id}`);
    }


    return (
        <div className="card bg-base-100 w-96 shadow-xl m-5">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{category.name}</h2>
                <div className="card-actions justify-end">
                    {user ? (
                        <>
                            {user.isadmin >= 70 && <button className='btn btn-primary' onClick={() => modosit(category)}>Módosítás</button>  }
                            {user.isadmin >= 70 && <button className='btn btn-error' onClick={() => torles(category)}>Törlés</button>}
                        </>
                    ) : (
                        <>
                            <Link to="/" className="justify-between">
                                Nincs kategoria
                            </Link>
                        </>)}


                    
                    
                </div>
            </div>
        </div>
    )
}

export default CategoriesCard