import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';
import secureStorage from '../../utils/secureStorage';


const Profile2 = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const { update, profile, refresh } = useContext(AuthContext);
  const [formDataProfile, setFormDataProfile] = useState([]);
  const url = profile ? `${import.meta.env.VITE_BASE_URL}/profile/${formDataProfile.user_id}` : `${import.meta.env.VITE_BASE_URL}/profile`;
  const method = profile ? 'POST' : 'POST';
  const user = secureStorage.getItem('user');

  useEffect(() => {
    setFormDataProfile({
      user_id: user.id,
      file_path: profile.file_path || '',
      file_name: profile.file_name || '',
    });
  }, [profile, refresh]);


  const handleFileChange = (e) => {
    setImage(e.target.files);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/profile/${formDataProfile.user_id}`);
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
    formData.append("user_id", formDataProfile.user_id);

    if (image && image.length > 0) {
      formData.append("image", image[0]);
    }
    //console.log(formData.get("image"));
    //console.log(formData.get("user_id"));

    try {
       {
        const response = await axios({
          method: method,
          url: url,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      };
    
    } catch (error) {
      console.error('There was an error uploading the Data!', error);
    }
    toast.success('Profile Updated');
    update();
  };

  const writeData = (e) => {
    setFormDataProfile((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
  };

  return (
    <div className=" mx-auto justify-center flex flex-col items-center p-4 bg-base-200">
      <h1 className="font-bold text-3xl text-center mb-5 text-secondary">Profile Adatok:</h1>
      <form className="flex flex-col gap-4 rounded-lg p-4  w-full max-w-md" onSubmit={onSubmit}>


        <div className="card bg-base-100 w-96 shadow-xl">
          <div className='flex flex-col gap-4 items-center m-5'>
            {profile.file_path ==null && <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="inline-block size-10 rounded-full ring-2 ring-white"
            />}
            {
              profile.file_path && <img src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path}`} alt="Preview" className="w-10 h-10 rounded-full object-cover" />
            }
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
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button type="button" onClick={() => handleDelete()} className="btn bg-rose-400 rounded-btn">Delete</button>
          <button type="button" onClick={() => navigate('/')} className="btn bg-rose-400 rounded-btn">Back</button>
          <button type="submit" className="btn bg-sky-400 rounded-btn">Save</button>
        </div>
      </form>

    </div>
  );
};

export default Profile2;