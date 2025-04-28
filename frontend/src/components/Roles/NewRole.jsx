import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


function NewRole() {
  const navigate = useNavigate();
  const { backendMuveletRole } = useContext(AuthContext);
  const { state } = useLocation();

  let cim = "Új Jogosultság felvitele";
  let method = "POST";
  let header = { "Content-type": "application/json", "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}` };

  let formObj = {
    id: "",
    power: "",
    warrant_name: ""
  };

  let url = `${import.meta.env.VITE_BASE_URL}/role`;

  if (state !== null) {
    const { role } = state;
    formObj = {
      id: role.id,
      power: role.power,
      warrant_name: role.warrant_name

    };
    method = "PATCH";
    cim = `${role.warrant_name} módosítása`;
    header = {
      "Content-type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("usertoken")}`,
      "RoleId": role.id
    };

  }

  const [formData, setFormData] = useState(formObj);

  const onSubmit = (e) => {
    e.preventDefault();
    backendMuveletRole(formData, method, url, header);
    navigate("/roles");
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
          <h2 className="text-2xl font-bold text-center pb-5 text-primary">{cim}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="input flex items-center gap-2 border-primary input-primary">
                <input className="grow placeholder-info"
                  type="number"
                  id="power"
                  placeholder="Érték"
                  required
                  onChange={writeData}
                  value={formData.power}
                />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="input input-primary flex items-center gap-2 border-primary">
                <input className="grow placeholder-info"
                  type="text"
                  id="warrant_name"
                  placeholder="Jogosultság neve"
                  required
                  onChange={writeData}
                  value={formData.warrant_name}
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

export default NewRole