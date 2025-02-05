import { useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import ServiceContext from "../context/ServiceContext";
import ProductsInfo from "./ProductsInfo";
import {CartContext} from "../context/CartContext";

function ProductsCard({ product }) {
  const { cartItems, addToCart } = useContext(CartContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(ServiceContext);
  const [isInfo, setInfo] = useState(false);
  

  const toCart = () => {
    navigate("/cart", { state: { product } });
  };

  const openInfo = () => {
    setInfo(true);
  };

    const closeInfo = () => {
    setInfo(false); // Info modális bezárása
  };


  

  const torles = (product) => {
    backendMuvelet(
       product,
      "DELETE",
      `${import.meta.env.VITE_BASE_URL}/product/${product.id}`
    );
  };
  console.log(product);

  return (
    
    
    <div className="card bg-base-100 w-96 shadow-xl m-5">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {/* <textarea  readOnly className="card-title">{product.description}</textarea> */}
        <h2 className="card-title">{product.price_per_day}</h2>
        <h2 className="card-title">{product.category.name}</h2> 
        <h2 className="card-title">{product.available ? "Elérhető" : "Nem elérhető"}</h2>
        <div className="card-actions justify-end">
        {
            isInfo && (<ProductsInfo title="FASZ" product={product} closeFunction={()=>closeInfo()} />)
            
        }
          {user ? (
            <>
              {user.isadmin >= 70 && (
                <button
                  className="btn btn-primary"
                  onClick={() => modosit(product)}
                >
                  Módosítás
                </button>
              )}
              {user.isadmin >= 70 && (
                <button
                  className="btn btn-error"
                  onClick={() => torles(product)}
                >
                  Törlés
                </button>
              )}
               {user.isadmin >=0  && (<button className="btn" onClick={() => openInfo()}>Info</button>)}
               {user.isadmin >=0  && (<button className="btn btn-warning" onClick={() => addToCart(product)}>Kosárba</button>)}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
