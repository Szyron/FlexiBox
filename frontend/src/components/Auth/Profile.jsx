import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import CartCheckout from '../Cart/CartCheckout';
import secureStorage from '../../utils/secureStorage';


const Profile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { update, profile, refresh } = useContext(AuthContext);
  const [formDataProfile, setFormDataProfile] = useState([]);
  const url = profile ? `${import.meta.env.VITE_BASE_URL}/profile/update` : `${import.meta.env.VITE_BASE_URL}/profile`;
  const method = profile ? 'POST' : 'POST';
  //console.log(url);
  const token = sessionStorage.getItem('usertoken');
  const header = profile ? {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`,
    'user_id': formDataProfile.user_id
  } : {
    'Content-Type': 'multipart/form-data'
  };


  //const user = JSON.parse(sessionStorage.getItem('user'));
  const user = secureStorage.getItem('user');


  useEffect(() => {
    setFormDataProfile({
      user_id: user.id,
      file_path: profile.file_path || '',
    });
    //console.log(profile);

  }, [profile, refresh]);


  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const handleDelete = async () => {
    try {
      const token = sessionStorage.getItem('usertoken');
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/profile/delete` , {
        headers: {
          'Authorization': `Bearer ${token}`,
          'user_id': formDataProfile.user_id
        }
    });
      console.log(response.data);
      toast.success('Profile Deleted');
      update();
      navigate('/');
    } catch (error) {
      console.error('There was an error deleting the profile!', error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("image", image[0]);

    // Append the form data to the form data object
    formData.append("user_id", formDataProfile.user_id);

    // Append the image to the form data

    if (image && image.length > 0) {
      formData.append("image", image[0]);
    }

    // Log the form data
    console.log(formData.get("image"));
    console.log(formData.get("user_id"));

    // Send the form data to the backend

    try {

      /* const response = await axios.post(`http://localhost:8000/api/profile`, formData, */ {
        
        const response = await axios({
          method: method,
          url: url,
          data: formData,
          headers: header
        });
      };
    
    } catch (error) {
      console.error('There was an error uploading the Data!', error);
    }
    toast.success('Profile kép frissítve/feltöltve');
    update();
  };

  const writeData = (e) => {
    setFormDataProfile((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
<div className="h-screen flex items-center justify-center p-4 bg-base-200">
  
  {/* Flexbox container a két résznek */}
  <div className="flex flex-row items-center justify-center gap-8 w-full px-8">

    {/* Profilfeltöltő form + cím - 1/4 szélesség */}
    <div className="flex flex-col flex-[1] max-w-sm bg-base-100 shadow-lg rounded-lg p-4">
      <h1 className="font-bold text-3xl text-center mb-5 text-secondary">Profile Adatok:</h1>
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="card bg-base-100 w-full">
          <div className="flex flex-col gap-4 items-center m-5">
            {profile.file_path == null && (
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="inline-block size-20 rounded-full ring-2 ring-white"
              />
            )}
            {profile.file_path && (
              <img
                src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path}`}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="fileInput" />
            <button
              onClick={() => document.getElementById("fileInput").click()}
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Kép feltöltése/módosítása
            </button>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button type="button" onClick={() => handleDelete()} className="btn bg-rose-400 rounded-btn">
            Delete
          </button>
          <button type="button" onClick={() => navigate("/")} className="btn bg-rose-400 rounded-btn">
            Back
          </button>
          <button type="submit" className="btn bg-sky-400 rounded-btn">
            Save
          </button>
        </div>
      </form>
    </div>

    {/* CartCheckout - 3/4 szélesség */}
    <div className="p-4 flex-[3] w-full">
      <CartCheckout />
    </div>

  </div>
</div>
  );
};

export default Profile;