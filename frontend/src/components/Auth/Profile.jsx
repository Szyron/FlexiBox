import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import secureStorage from '../../utils/secureStorage';
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';
import CartCheckout from '../Cart/CartCheckout';



function Profile() {
    const navigate = useNavigate();
    const token = sessionStorage.getItem('usertoken');
    const { user, update,setProfile } = useContext(AuthContext);
    const profile ={
    file_path : null // Replace with actual profile data from your authentication context or state
    }

    let url = `${import.meta.env.VITE_BASE_URL}/profile/update`;
    let method = 'POST';
    let header = {

        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
        'userId': user.id
    };

   

    const [image, setImage] = useState(null);

    const onFileChange = (e) => {
       // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const handleDelete = async () => {
        try {
            const token = sessionStorage.getItem('usertoken');
            const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/profile/delete` , {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'userId': user.id
                }
            });
            console.log(response.data);
            sessionStorage.removeItem('profile');
            setProfile(null);
            update();
            toast.success('Profile Deleted');
            navigate('/');
        } catch (error) {
            console.error('There was an error deleting the profile!', error);
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        // Van-e kép kiválasztva?
        if (!image) {
            toast.error('Kérlek válassz ki egy képet!');
            return;
        }
        // Logok a konzolra
        console.log("Submitting form...");
        console.log(image);
        console.log('URL',url);
        console.log('method',method);
        console.log('header',header);
        console.log('token',token);
        const formData = new FormData();

        // Formdata készítése
        formData.append("user_id", user.user_id);
        formData.append("image", image);
        


        // Image tartalmának ellenőrzése
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`); // FormData tartalmának ellenőrzése
        }
       
        for (let [key, value] of formData.entries()) {
            if (key === "image" && value instanceof File) {
                console.log(`${key}: ${value.name}, ${value.type}, ${value.size} bytes`); // Fájl részletei
            } else {
                console.log(`${key}: ${value}`);
            }
        }

        try {
            const response = await axios.post(url, formData, { headers: header });
            console.log(response.data);
            update();
            navigate('/');
        } catch (error) {
        console.error('There was an error updating the profile!', error);
        }
        toast.success('Sikeresen módosítva/feltöltve!');
        navigate('/');
    }

  return (
    <div className='text-3xl bg-base-200 text-center font-bold text-primary w-full'>Profile
    <form className='flex flex-col gap-4 items-center m-5' onSubmit={onSubmit}>
      {/* Profilkép megjelenítése és feltöltés */}
      <div className="flex flex-col items-center">
        <img
          src={
            profile.file_path == null && !image
              ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              : image
              ? URL.createObjectURL(image)
              : `${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path}`
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover cursor-pointer"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <button
          type="button"
          onClick={() => document.getElementById("fileInput").click()}
          className="mt-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Kép feltöltése/módosítása
        </button>
      </div>
  
      {/* Gombok */}
      <button type='submit' className="btn btn-primary">Save</button>
      <button type="button" onClick={() => handleDelete()} className="btn bg-rose-400 rounded-btn">
        Delete
      </button>
      <button type="button" onClick={() => navigate("/")} className="btn bg-rose-400 rounded-btn">
        Back
      </button>
    </form>
    <div className="p-4 flex-[3] w-full">
      <CartCheckout />
    </div>
  </div>
  )
}

export default Profile