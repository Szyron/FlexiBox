import { useState , useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceContext from "../../context/ServiceContext";
import { toast } from "react-toastify";

function NewLocker() {
  const navigate = useNavigate();

  const { backendMuvelet } = useContext(ServiceContext);

  const { state } = useLocation();
  let cim = "Új Csomagautómata Felvitele";
  let method = "POST";
  let header = {"Content-type": "application/json"};

  let formObj = {
    id: "",
    locker_name: "",
    address: "",
    description: "",
  };

  let url = `${import.meta.env.VITE_BASE_URL}/locker`;

  if (state!==null)
    {
      const {locker} = state;
      formObj = {
        id : locker.id,
        locker_name : locker.locker_name,
        address : locker.address,
        description : locker.description,     
      };
      method = "PATCH";
      cim = `${locker.locker_name} módosítása`;
    }
  
    const [formData, setFormData] = useState(formObj);
    
    const onSubmit = (e) => {
      e.preventDefault();
      backendMuvelet(formData,method,url,header);
      navigate("/lockers");
      console.log(formData);
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
          <h2 className="text-2xl font-bold text-center text-primary">{cim}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input className="grow"
                  type="text"
                  id="locker_name"
                  placeholder="Csomagautómata neve"
                  required
                  onChange={writeData}
                  value={formData.locker_name}
                />
              </label>
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input className="grow"
                  type="text"
                  id="address"
                  placeholder="Cím"
                  required
                  onChange={writeData}
                  value={formData.address}

                />
              </label>
              <label className="label">
              </label>
              <label className="flex items-center gap-2">
              <textarea className="textarea textarea-bordered h-24 textarea-auto w-full"
                id="description"
                placeholder="Csomagautómata leirása"
                required
                onChange={writeData}
                value={formData.description}
              />
            </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white">
                Felvitel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewLocker