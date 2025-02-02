import { useState , useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import ServiceContext from "../context/ServiceContext";

function NewCategory() {

    const navigate = useNavigate();
    
    const {update,setCategories , backendMuvelet} = useContext(ServiceContext);
    const {state} = useLocation();

    let cim = "Új Kategória Felvitele";
    let method = "POST";

    let formObj = {
        id: "",
        name: "",
      };
    
    
    let url = `${import.meta.env.VITE_BASE_URL}/category`;


    if (state!==null)
    {
      const {category} = state;
      formObj = {
        id : category.id,
        name : category.name,
        
      };
      method = "PATCH";
      cim = `${category.name} módosítása`;
    }


    

    //Teszt V1
    /* const kuldes = (formData, method) => {
      fetch(`${import.meta.env.VITE_BASE_URL}/category`, {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setCategories(data.category);
            toast.success("Sikeres adatfelvitel!");
            update();
            setTimeout(() => {
              navigate("/categories");
            }, 2000); 
          
            
            
          } else {
            toast.error(data.error);
          }
        })
        .catch((err) => toast.error(err));
    }; */


  
    const [formData, setFormData] = useState(formObj);
    
    //Teszt V2
    const onSubmit = (e) => {
      e.preventDefault();
      //kuldes(formData, "POST");
      //backendMuvelet(formData,"POST",`${import.meta.env.VITE_BASE_URL}/category`);
      backendMuvelet(formData,method,url);
      navigate("/categories");
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
                <span className="label-text">Név</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input className="grow"
                  type="text"
                  id="name"
                  placeholder="Kategória neve"
                  required
                  onChange={writeData}
                  value={formData.name}
                />
              </label>
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

export default NewCategory;