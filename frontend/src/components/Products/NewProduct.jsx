import { useState , useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceContext from "../../context/ServiceContext";

function NewProduct() {

    const navigate = useNavigate();
    const {update,setProducts , backendMuvelet, categories} = useContext(ServiceContext);
    const {state} = useLocation();
    
    
    let cim = "Új termék felvitele";
    let method = "POST";

    let formObj = {
        id: "",
        name: "",
        description: "",
        price_per_day: "",
        category_id: 1,
        available: 1,
      };
    
    
    let url = `${import.meta.env.VITE_BASE_URL}/product`;


    if (state!==null)
    {
      const {product} = state;
      formObj = {
        id : product.id,
        name : product.name,
        description : product.description,
        price_per_day : product.price_per_day,
        category_id : product.category_id,
        available : product.available
      };
      method = "PATCH";
      cim = `${product.name} módosítása`;
    }


  
    const [formData, setFormData] = useState(formObj);
    
    
    const onSubmit = (e) => {
      e.preventDefault();
      //console.log(formData);
      backendMuvelet(formData,method,url);
      navigate("/products");
    };

  
    const writeData = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <img src="src/img/Szirony2.png" alt="" />
        <h2 className="text-2xl font-bold text-center">{cim}</h2>
        <form onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Termék neve</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input className="grow"
                type="text"
                id="name"
                placeholder="Termék neve"
                required
                onChange={writeData}
                value={formData.name}
              />
            </label>
            <label className="label">
              <span className="label-text">Leirás</span>
            </label>
            <label className="flex items-center gap-2">
              <textarea className="textarea textarea-bordered h-24 textarea-auto w-full"
                id="description"
                placeholder="Termék leirása"
                required
                onChange={writeData}
                value={formData.description}
              />
            </label>
            <label className="label">
              <span className="label-text">Bérlési ára</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <input className="grow"
                type="number"
                id="price_per_day"
                placeholder="Termék Bérlési ára"
                required
                onChange={writeData}
                value={formData.price_per_day}
              />
            </label>
            <label className="label">
              <span className="label-text">Kategória</span>
            </label>
                <select className="select select-bordered w-full" id="category_id" onChange={writeData} value={formData.category_id}>
                {
                    categories.map((category) => ( <option key={category.id} value={category.id}>{category.name}</option>))
                } 
                </select>
            <label className="label">
              <span className="label-text">Bérlési ára</span>
            </label>
                <select className="select select-bordered w-full" id="available" onChange={writeData} value={formData.available}>
                    <option value="1">Elérhető</option>
                    <option value="0">Nem elérhető</option>
                </select>  
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Felvitel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default NewProduct