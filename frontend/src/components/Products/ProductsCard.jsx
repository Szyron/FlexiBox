import { useNavigate } from "react-router-dom";
import { useContext, useState ,useEffect } from "react";
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

  // Handler for locker selection
  const handleLockerChange = (event) => {
    setSelectedLocker(event.target.value);
  };

  // Fetching the products and their lockers
  useEffect(() => {
    if (product.lockers && product.lockers.length > 0) {
      setSelectedLocker(product.lockers[0].id); // Pre-select the first locker by default
    }
  }, [product]);

  return (


  <div className="card bg-base-100 w-96 shadow-sm m-10 border-primary border-2 hover:shadow-lg transition duration-300 ease-in-out">
  <figure className="px-10 pt-10 ">
    <img
      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${product.file_path}`}
      className="rounded-lg w-full h-60 object-cover  hover:border-2 border-primary"
      alt="Product"
    />
  </figure>

  <div className="card-body flex flex-col justify-between flex-grow" >
    <div className="mb-4">
      <h2 className="card-title line-clamp-2">{product.name}</h2>
      <h2 className="card-title">{product.price_per_day}</h2>
      <h2 className="card-title">{product.category.name}</h2>
      <h2 className="card-title">
        {product.available ? "Elérhető" : "Nem elérhető"}
      </h2>
    </div>
    
    <div className="mb-4">
      <label className="block text-sm">Válasszon autómatát:</label>
        <select
            value={selectedLocker}
            
            onChange={handleLockerChange}
            className="select select-bordered w-full"
          >
            {console.log("SZIA LAJOSSS?",selectedLocker)}
            {product.lockers.map((locker) => (
              <option key={locker.id} value={locker.id}>
                {locker.locker_name} - {locker.address}
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
      <button className="btn btn-secondary text-white" onClick={() => openInfo()}>
        Info
      </button>
      <button className="btn btn-success text-white" onClick={() => addToCart(product,selectedLocker)}>
        Kosárba
      </button>
    </div>
  </div>
</div>
  );
}

export default ProductsCard;
