import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceContext from "../../context/ServiceContext";

function NewLocker() {
  const navigate = useNavigate();
  const { backendMuvelet } = useContext(ServiceContext);

  const { state } = useLocation();
  let cim = "Új csomagautomata felvitel";
  let method = "POST";
  let header = { "Content-type": "application/json" };

  let formObj = {
    id: "",
    locker_name: "",
    address: "",
    description: "",
  };

  let url = `${import.meta.env.VITE_BASE_URL}/locker`;

  if (state !== null) {
    const { locker } = state;
    formObj = {
      id: locker.id,
      locker_name: locker.locker_name,
      address: locker.address,
      description: locker.description,
    };
    method = "PATCH";
    cim = `${locker.locker_name} módosítása`;
  }

  const [formData, setFormData] = useState(formObj);

  const onSubmit = (e) => {
    e.preventDefault();
    backendMuvelet(formData, method, url, header);
    navigate("/lockers");
  };

  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen text-info">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">{cim}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-primary flex items-center gap-2 border-primary">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input className="grow placeholder-info"
                  type="text"
                  id="locker_name"
                  placeholder="Csomagautomata neve"
                  required
                  onChange={writeData}
                  value={formData.locker_name}
                />
              </label>
              <label className="label">
              </label>
              <label className="input input-primary flex items-center gap-2 border-primary">
                <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M15.93 18a1.47 1.47 0 0 1 .07.46c0 1.4-1.79 2.54-4 2.54s-4-1.14-4-2.54A1.47 1.47 0 0 1 8.07 18" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M9 6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3h0a3 3 0 0 0-3-3h0A3 3 0 0 0 9 6Zm3 3v8" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                <input className="grow placeholder-info"
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
                <textarea className="textarea textarea-primary h-24 textarea-auto w-full border-primary placeholder-info"
                  id="description"
                  placeholder="Csomagautomata leírása"
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