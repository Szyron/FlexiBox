import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import TermekContext from '../context/TermekContext';



function Termek({termek}) {

    const navigate=useNavigate();
      const {backendMuvelet}=useContext(TermekContext);
    
      const modosit =()=>{
        navigate("/ujtermek", {state:{termek}});
      }
      
      const torles=(termek)=>{
        backendMuvelet(termek, "DELETE",`${import.meta.env.VITE_BASE_URL}/api/products/${termek.id}`);
      }
      
  return (
    <div className="card bg-sky-200 text-sky-800 m-5 w-96">
    <div className="card-body">
      <h2 className="card-title">id:{termek.id}</h2>
      <p>{termek.termeknev}</p>
      <p>{termek.termekar}</p>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={()=>modosit(termek)}>Módosítás</button>
        <button className='btn btn-warning' onClick={()=>torles(termek)} >Törlés</button>
       
      </div>
    </div>
  </div>
  )
}

export default Termek