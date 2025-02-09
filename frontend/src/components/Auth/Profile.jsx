import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';



const Profile = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const {update}=useContext(AuthContext);
   


    const user=JSON.parse(sessionStorage.getItem('user'));

    const [formDataProfile, setFormDataProfile] = useState({
      user_id: user.id,
      city: '',
      street: '',
      zip: '',
  });



    const handleFileChange = (e) => {

       // setImage(e.target.files);
        setImage(e.target.files);
      //  update();
       
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append("image", image[0]);

        // Append the form data to the form data object
        formData.append("user_id", formDataProfile.user_id);
        formData.append("city", formDataProfile.city);
        formData.append("street", formDataProfile.street);
        formData.append("zip", formDataProfile.zip);

        // Append the image to the form data

        if (image && image.length > 0) {
            formData.append("image", image[0]);
            
          } else {
            console.error("No image selected");
            return; // Prevent form submission if no image is selected
          }

        // Log the form data
        console.log(formData.get("image"));
        console.log(formData.get("user_id"));
        console.log(formData.get("city"));
        console.log(formData.get("street"));
        console.log(formData.get("zip"));

        // Send the form data to the backend
        try {
            const response = await axios.post('http://localhost:8000/api/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
           // navigate('/');
           update();
            
            
        } catch (error) {
            console.error('There was an error uploading the Data!', error);
        }
    };

    

    const writeData = (e) => {
        setFormDataProfile((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };



    return (
        <div className="container mx-auto justify-center flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl text-center mb-5">Profile Adatok:</h1>
      <form className="flex flex-col gap-4 rounded-lg p-4 bg-base-200 w-full max-w-md" onSubmit={onSubmit}>


      <div className="card bg-base-100 w-96 shadow-xl">
      <div className='flex flex-col gap-4 items-center m-5'>
      {!image &&  <img
          alt=""
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block size-10 rounded-full ring-2 ring-white"
        />}
       {image && <img src={URL.createObjectURL(image[0])} alt="Preview" className="w-10 h-10 rounded-full object-cover" />}
      <input 
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="fileInput"
      />
      <button onClick={() => document.getElementById('fileInput').click()} 
         className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        Change
      </button>
     
      <input 
        type="text" 
        required 
        id="city" 
        value={formDataProfile.city} 
        onChange={writeData} 
        placeholder="City" 
        className="input input-bordered w-full max-w-xs" 
      />
       <input 
        type="text" 
        required 
        id="street" 
        value={formDataProfile.street} 
        onChange={writeData} 
        placeholder="Street" 
        className="input input-bordered w-full max-w-xs" 
      />
       <input 
        type="number" 
        required 
        id="zip" 
        value={formDataProfile.zip} 
        onChange={writeData} 
        placeholder="Zip" 
        className="input input-bordered w-full max-w-xs" 
      />


     
      
      
      
        </div>
        </div>


      

             
       
        <div className="flex justify-center gap-4">
          <button className="btn">Cancel</button>
          <button type="submit" className="btn bg-sky-400 rounded-btn">Save</button>
        </div>
      </form>
    </div>
    );
};

export default Profile;