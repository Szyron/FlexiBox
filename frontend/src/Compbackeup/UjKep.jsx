import axios from 'axios';
import React, { useState } from 'react';

const UjKep = () => {
    const [image, setImage] = useState(null);

    const handleFileChange = (e) => {
        setImage(e.target.files);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        //formData.append("image", image[0]);

        if (image && image.length > 0) {
            formData.append("image", image[0]);
          } else {
            console.error("No image selected");
            return; // Prevent form submission if no image is selected
          }

        // Log the form data
        console.log(formData.get("image"));

        // Send the form data to the backend
        try {
            const response = await axios.post('http://localhost:8000/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('There was an error uploading the image!', error);
        }
    };

    return (
        <div className="container mx-auto justify-center flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl text-center mb-5">Kép feltöltése:</h1>
      <form className="flex flex-col gap-4 rounded-lg p-4 bg-base-200 w-full max-w-md" onSubmit={onSubmit}>


      <div className="card bg-base-100 w-96 shadow-xl">
      <div className='flex items-center m-5'>
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

export default UjKep;