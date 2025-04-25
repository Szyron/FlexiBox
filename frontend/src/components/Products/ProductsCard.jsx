import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import ServiceContext from "../../context/ServiceContext";
import ProductsInfo from "./ProductsInfo";
import secureStorage from "../../utils/secureStorage";


function ProductsCard({ product }) {
  const { cartItems, addToCart } = useContext(CartContext);
  const user = secureStorage.getItem("user");
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(ServiceContext);
  const [isInfo, setInfo] = useState(false);
  const [selectedLocker, setSelectedLocker] = useState(null);

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
    setInfo(false);
  };

  const torles = (product) => {
    const method = "DELETE";
    const url = `${import.meta.env.VITE_BASE_URL}/product/delete`;
    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
      productId: product.id,
    };
    const successMessage = `${product.name} sikeresen törölve!`;
    const errorMessage = `${product.name} törlése sikertelen!`;
    backendMuvelet(null, method, url, header, successMessage, errorMessage);
  };

  const handleLockerChange = (event) => {
    setSelectedLocker(event.target.value);
  };

  useEffect(() => {
    if (product.lockers && product.lockers.length > 0) {
      setSelectedLocker(product.lockers[0].id);
    }
  }, [product]);

  return (
<div className="card bg-base-100 w-96 shadow-sm m-10 hover:shadow-lg transition duration-300 ease-in-out">
  <figure className="px-8 pt-8">
    <img
      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${product.file_path}`}
      className="rounded-lg w-full h-60 object-cover"
      alt="Product"
    />
  </figure>
  <div className="card-body flex flex-col justify-between flex-grow">
    <div>
      <h2 className="card-title line-clamp-2 text-center text-primary font-bold">{product.name}</h2>
      <h2 className="card-title line-clamp-2 text-center text-info">{product.price_per_day} Ft/nap</h2>
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-info mb-2">
        Válasszon csomagautomatát:
      </label>
      <select
        value={selectedLocker}
        onChange={handleLockerChange}
        className="w-full rounded-lg border border-primary bg-base-100 py-2.5 px-3 text-sm text-gray-800 shadow-sm focus:border-secondary focus:ring-2 focus:ring-secondary/50"
      >
        {product.lockers.map((locker) => (
          <option key={locker.id} value={locker.id}>
            {locker.address}
          </option>
        ))}
      </select>
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
      {user?.isadmin >= 11 && (
        <button className="btn btn-success text-white" id="add-to-cart-button" onClick={() => addToCart(product, selectedLocker)}>
          Kosár
        </button>
      )}
      <button className="btn btn-secondary text-white" onClick={() => openInfo()}>
        Info
      </button>
    </div>
  </div>
</div>
  );
}

export default ProductsCard;
