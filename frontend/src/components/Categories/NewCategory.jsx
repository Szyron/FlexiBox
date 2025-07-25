import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CrudContext from "../../context/CrudContext";
import InitialContext from "../../context/InitialContext";


function NewCategory() {

  const navigate = useNavigate();
  const { update } = useContext(InitialContext);
  const { backendMuvelet } = useContext(CrudContext);
  const { state } = useLocation();

  let cim = "Új Kategória Felvitele";
  let method = "POST";
  let header = { "Content-type": "application/json" };


  let formObj = {
    id: "",
    name: "",
  };


  let url = `${import.meta.env.VITE_BASE_URL}/category`;


  if (state !== null) {
    const { category } = state;
    formObj = {
      id: category.id,
      name: category.name,

    };
    method = "PATCH";
    cim = `${category.name} módosítása`;
  }

  const [formData, setFormData] = useState(formObj);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("A kategória név mező kitöltése kötelező!");
      return;
    }
    const isEdit = !!formData.id;
    const method = isEdit ? "PATCH" : "POST";
    const url = isEdit
      ? `${import.meta.env.VITE_BASE_URL}/category`
      : `${import.meta.env.VITE_BASE_URL}/category`;

    const successMessage = isEdit
      ? `${formData.name} sikeresen módosítva!`
      : "Új kategória sikeresen létrehozva!";
    const errorMessage = isEdit
      ? `${formData.name} módosítása sikertelen!`
      : "Nem sikerült a kategória létrehozása!";

    try {
      await backendMuvelet(
        formData,
        method,
        url,
        { "Content-Type": "application/json" },
        successMessage,
        errorMessage
      );
      update();
      navigate("/categories");
    } catch (error) {
      console.error("Hiba történt a kategória felvitelében:", error);
    }
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
                <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M3.75 4.5L4.5 3.75H10.5L11.25 4.5V10.5L10.5 11.25H4.5L3.75 10.5V4.5ZM5.25 5.25V9.75H9.75V5.25H5.25ZM13.5 3.75L12.75 4.5V10.5L13.5 11.25H19.5L20.25 10.5V4.5L19.5 3.75H13.5ZM14.25 9.75V5.25H18.75V9.75H14.25ZM17.25 20.25H15.75V17.25H12.75V15.75H15.75V12.75H17.25V15.75H20.25V17.25H17.25V20.25ZM4.5 12.75L3.75 13.5V19.5L4.5 20.25H10.5L11.25 19.5V13.5L10.5 12.75H4.5ZM5.25 18.75V14.25H9.75V18.75H5.25Z" fill="#50c6c9"></path> </g></svg>
                <input className="grow placeholder-info"
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

export default NewCategory;