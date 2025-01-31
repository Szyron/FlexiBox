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
        formData.append("image", image[0]);

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
        <div>
            <h2 className='text-2xl text-center font-bold'>Kép feltöltése</h2>
            <div className='flex justify-center items-center'>
                <div className='flex-column m-10'>
                    <form onSubmit={onSubmit}>
                        <input type="file" onChange={handleFileChange} />
                        <button type="submit">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UjKep;