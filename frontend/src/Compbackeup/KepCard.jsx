import React from 'react'

function KepCard({kep}) {
  //const imageUrl = `http://localhost:8000/storage/${kep.file_path}`;
  //console.log('Image URL:', imageUrl);
  
 //<div className="card bg-sky-200 text-sky-800 m-5 w-auto">
 // <div className="card-body">
 //   <h2 className="card-title">Kep id:{kep.id}</h2>
 //     <p className="card-subtitle">Kep name:{kep.file_name}</p>
  //    <img 
  //    src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}/${kep.file_path}`} 
      
  //    alt={kep.file_name} 
  //    className="card-img"
  //    style={{ maxWidth: '50%', height: '50%' }} 
  //    />
  //  <div className="card-actions justify-end">
     
  //  </div>
  //</div>
// </div>
 
  return (
   

<div className="card bg-sky-100 w-96 shadow-xl m-5">
  <figure>
    <img
      src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}/${kep.file_path}`} 
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">Kep id:{kep.id}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>




  )
}

export default KepCard