import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import initialContext from "../../context/InitialContext";
import CrudContext from "../../context/CrudContext";


function NewProduct() {
  const navigate = useNavigate();
  const { categories, lockers, update } = useContext(initialContext);
  const { backendMuveletFile } = useContext(CrudContext);

  const { state } = useLocation();
  const [image, setImage] = useState(null);

  let headers = { "Content-type": "multipart/form-data" };
  let cim = "Új termék felvitele";
  let method = "POST";

  let formObj = {
    id: "",
    name: "",
    description: "",
    price_per_day: "",
    category_id: 1,
    available: 1,
    locker_ids: [],
  };

  let url = `${import.meta.env.VITE_BASE_URL}/product`;

  if (state !== null) {
    const { product } = state;
    formObj = {
      id: product.id,
      name: product.name,
      description: product.description,
      price_per_day: product.price_per_day,
      category_id: product.category_id,
      available: product.available,

      locker_ids: product.lockers.map((locker) => locker.id),
    };
    method = "POST";
    url = `${import.meta.env.VITE_BASE_URL}/product/update`;
    cim = `${product.name} módosítása`;
  }

  const [formData, setFormData] = useState(formObj);

  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("price_per_day", formData.price_per_day);
    formDataToSubmit.append("category_id", formData.category_id);
    formDataToSubmit.append("available", formData.available);

    formData.locker_ids.forEach((id) => {
      formDataToSubmit.append("locker_ids[]", id);
    });

    if (image && image.length > 0) {
      formDataToSubmit.append("image", image[0]);
    } else if (!formData.id) {
      toast.error("Nincs kép kiválasztva!");
      return;
    }

    if (formData.id) {
      formDataToSubmit.append("id", formData.id);
    }

    const isEdit = !!formData.id;
    const method = isEdit ? "POST" : "POST";
    const url = isEdit
      ? `${import.meta.env.VITE_BASE_URL}/product/update`
      : `${import.meta.env.VITE_BASE_URL}/product`;

    const successMessage = isEdit
      ? `${formData.name} sikeresen módosítva!`
      : "Új termék sikeresen létrehozva!";
    const errorMessage = isEdit
      ? `${formData.name} módosítása sikertelen!`
      : "Nem sikerült a termék létrehozása!";


    try {
      await backendMuveletFile(
        formDataToSubmit,
        method,
        url,
        { Authorization: `Bearer ${sessionStorage.getItem("usertoken")}` },
        successMessage,
        errorMessage
      );
      update();
      navigate("/products");
    } catch (error) {
      console.error("Hiba történt:", error);
    }
  };

  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl text-3xl text-center text-info">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">{cim}</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
              </label>
              {state && <img src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${state.product.file_path}`} alt="Preview" className="w-10 h-10 rounded-full object-cover" />}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-primary w-full max-w-xs border-primary"
              />
              <label className="label">
              </label>
              <label className="input input-primary flex items-center gap-2 border-primary">
                <input className="grow placeholder-info"
                  type="text"
                  id="name"
                  placeholder="Termék neve"
                  required
                  onChange={writeData}
                  value={formData.name}
                />
              </label>
              <label className="label">
              </label>
              <label className="flex items-center gap-2">
                <textarea className="textarea textarea-primary h-24 textarea-auto w-full border-primary placeholder-info"
                  id="description"
                  placeholder="Termék leirása"
                  required
                  onChange={writeData}
                  value={formData.description}
                />
              </label>
              <label className="label">
              </label>
              <label className="input input-primary flex items-center gap-2 border-primary">
                <input className="grow placeholder-info"
                  type="number"
                  id="price_per_day"
                  placeholder="Termék Bérlési ára Ft/nap"
                  required
                  onChange={writeData}
                  value={formData.price_per_day}
                />
              </label>
              <label className="label">
                <span className="label-text">Kategória</span>
              </label>
              <select className="select select-primary w-full border-primary" id="category_id" onChange={writeData} value={formData.category_id}>
                {
                  categories.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))
                }
              </select>
              <label className="label">
                <span className="label-text">Csomagautomata</span>
              </label>
              <select
                className="select select-primary w-full border-primary"
                id="locker_ids"
                multiple
                onChange={(e) => {
                  const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                  setFormData((prev) => ({ ...prev, locker_ids: selected }));
                }}
                value={formData.locker_ids || []}
              >
                {lockers.map((locker) => (
                  <option className="m-1" key={locker.id} value={locker.id}>
                    {locker.locker_name}
                  </option>
                ))}
              </select>

              <label className="label">
              </label>
              <select className="select select-primary w-full border-primary" id="available" onChange={writeData} value={formData.available}>
                <option value="1">Elérhető</option>
                <option value="0">Nem elérhető</option>
              </select>
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

export default NewProduct