import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CrudContext from "../../context/CrudContext";
import InitialContext from "../../context/InitialContext";

function NewPublicArea() {
  const navigate = useNavigate();
  const { updatePublicAreaName } = useContext(InitialContext); // Az InitialContext-ből elérjük a frissítési függvényt
  const { backendMuvelet } = useContext(CrudContext);
  const { state } = useLocation();

  let cim = "Új közterület felvitel";
  let method = "POST";
  let header = {
    "Content-type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
  };

  let formObj = {
    public_area_name: "",
  };

  let url = `${import.meta.env.VITE_BASE_URL}/publicareaname`;

  if (state !== null) {
    const { publicarea } = state;
    formObj = {
      id: publicarea.id,
      public_area_name: publicarea.public_area_name,
    };
    method = "PATCH";
    cim = `${publicarea.public_area_name} módosítása`;
    header = {
      "Content-type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("usertoken")}`,
      StreetTypeId: publicarea.id,
    };
  }

  const [formData, setFormData] = useState(formObj);

  const onSubmit = async (e) => {
    e.preventDefault();

    const successMessage =
      method === "POST"
        ? "Új közterület sikeresen felvéve!"
        : `${formData.public_area_name} sikeresen módosítva!`;

    const errorMessage =
      method === "POST"
        ? "Nem sikerült a közterület felvétele!"
        : `${formData.public_area_name} módosítása sikertelen!`;

    backendMuvelet(formData, method, url, header, successMessage, errorMessage);
    updatePublicAreaName();
    navigate("/publicareas");
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
              <label className="input input-primary flex items-center gap-2 border-primary">
              <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M15.93 18a1.47 1.47 0 0 1 .07.46c0 1.4-1.79 2.54-4 2.54s-4-1.14-4-2.54A1.47 1.47 0 0 1 8.07 18" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/><path d="M9 6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3h0a3 3 0 0 0-3-3h0A3 3 0 0 0 9 6Zm3 3v8" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
                <input className="grow placeholder-info"
                  type="text"
                  id="public_area_name"
                  placeholder="Közterület neve"
                  required
                  onChange={writeData}
                  value={formData.public_area_name}
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

export default NewPublicArea