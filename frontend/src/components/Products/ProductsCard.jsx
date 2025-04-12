import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ServiceContext from "../../context/ServiceContext";
import ProductsInfo from "./ProductsInfo";
import { CartContext } from "../../context/CartContext";
import secureStorage from "../../utils/secureStorage";

function ProductsCard({ product }) {
  const { cartItems, addToCart } = useContext(CartContext);
  //const user = JSON.parse(sessionStorage.getItem("user"));
  const user = secureStorage.getItem("user");
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(ServiceContext);
  const [isInfo, setInfo] = useState(false);

  const modosit = (product) => {
    navigate("/newproduct", { state: { product } });
  };



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
      `${import.meta.env.VITE_BASE_URL}/product/delete`,
      {
        "Content-type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
        "productId": product.id
      }
    );
  };

  // src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"

  return (


    <div className="card bg-base-100 w-96 shadow-xl m-5 flex flex-col h-[550px]">
  <figure>
    <img
      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${product.file_path}`}
      className="rounded-lg w-full h-60 object-cover"
      alt="Product"
    />
  </figure>

  <div className="card-body flex flex-col justify-between flex-grow">
    <div className="mb-4">
      <h2 className="card-title line-clamp-2">{product.name}</h2>
      <h2 className="card-title">{product.price_per_day}</h2>
      <h2 className="card-title">{product.category.name}</h2>
      <h2 className="card-title">
        {product.available ? "Elérhető" : "Nem elérhető"}
      </h2>
    </div>

    <div className="card-actions mt-auto flex-wrap gap-2">
      {isInfo && (
        <ProductsInfo
          product={product}
          closeFunction={() => closeInfo()}
        />
      )}
      {user?.isadmin >= 70 && (
        <>
          <button className="btn btn-primary text-white" onClick={() => modosit(product)}>
            Módosítás
          </button>
          <button className="btn btn-info text-white" onClick={() => torles(product)}>
            Törlés
          </button>
        </>
      )}
      <button className="btn btn-secondary text-white" onClick={() => openInfo()}>
        Info
      </button>
      <button className="btn btn-success text-white" onClick={() => addToCart(product)}>
        Kosárba
      </button>
    </div>
  </div>
</div>
  );
}

export default ProductsCard;
