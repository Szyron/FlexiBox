import { useState , useContext} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ServiceContext from "../../context/ServiceContext";
import axios from "axios";
import { toast } from "react-toastify";

function NewProduct() {

    const navigate = useNavigate();
    const {update,setProducts , backendMuveletFile, categories} = useContext(ServiceContext);
    const {state} = useLocation();
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
      };
    
    
    let url = `${import.meta.env.VITE_BASE_URL}/product`;


    if (state!==null)
    {
      const {product} = state;
      formObj = {
        id: product.id,
        name: product.name,
        description: product.description,
        price_per_day: product.price_per_day,
        category_id: product.category_id,
        available: product.available
      };
      method = "POST";
      url = `${import.meta.env.VITE_BASE_URL}/product/update`;
      cim = `${product.name} módosítása`;
    }


    
  
    const [formData, setFormData] = useState(formObj);

    console.log("Product data from formobj:", formData);

    const handleFileChange = (e) => {

      // setImage(e.target.files);
       setImage(e.target.files);
     //  update();
      
   };

   

   console.log("Product ID:", formData.id);
    
    const onSubmit = async (e) => {
      e.preventDefault();
      console.log(method,url);
      console.log("Product data from location:", state);
     
       // Create a new FormData instance
  const formDataToSubmit = new FormData();
  // Append the product id if it exists
 
 // if (formData.id) {
   // formDataToSubmit.append("id", formData.id);
  // }
  console.log("formData.id before appending:", formData.id);
  
   if (method === "POST" && formData.id) {
    console.log("Appending product ID for PATCH:", formData.id);
    formDataToSubmit.append("id", formData.id);
  }


  //formDataToSubmit.append("id", formData.id); // Ensure id is included in the form data
  formDataToSubmit.append("name", formData.name);
  formDataToSubmit.append("description", formData.description);
  formDataToSubmit.append("price_per_day", formData.price_per_day);
  formDataToSubmit.append("category_id", formData.category_id);
  formDataToSubmit.append("available", formData.available);

  


  // Append the image to the form data
  if (image && image.length > 0) {
    formDataToSubmit.append("image", image[0]);
  } else if (method === "POST" && !formData.id){
    toast.error("No image selected");
    return; // Prevent form submission if no image is selected
  }

  // Log the form data for debugging
  for (let pair of formDataToSubmit.entries()) {
    console.log(pair[0] + ': ' + pair[1]);
  }

//axios backup version
// const response = await axios.post(url, formDataToSubmit, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
// });

console.log("Product data from form:", formData);
 // Log the form data for debugging
 console.log([...formDataToSubmit.entries()]);

 console.log("FormData before submit:", [...formDataToSubmit.entries()]);

  try {
    const response = await axios({
      method: method,
      url: url,
      data: formDataToSubmit,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    console.log(response.data);
    
    update();
    navigate("/products");
  } catch (error) {
    console.error('There was an error uploading the Data!', error);
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
    <div className="card w-96 bg-base-100 shadow-xl">
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
          className="file-input file-input-bordered w-full max-w-xs" 
          
          />
            <label className="label">
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
            </label>
                <select className="select select-bordered w-full" id="available" onChange={writeData} value={formData.available}>
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