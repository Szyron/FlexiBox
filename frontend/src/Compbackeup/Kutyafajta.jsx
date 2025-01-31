import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import KutyaContext from '../context/KutyaContext';



function Kutyafajta({kutyafajta}) {
  const navigate=useNavigate();
  const {backendMuvelet}=useContext(KutyaContext);

  const modosit =(kutyafaja)=>{
    navigate("/ujkutyafajta", {state:{kutyafaja}});
  }
  
  const torles=(kutyafajta)=>{
    backendMuvelet(kutyafajta, "DELETE",`${import.meta.env.VITE_BASE_URL}/kutyafajtak`);
  }
  

  return (
    <div className="card bg-sky-200 text-sky-800 m-5 w-96">
    <div className="card-body">
      <h2 className="card-title">id:{kutyafajta.Id}</h2>
      <p>{kutyafajta.nev}</p>
      <p>{kutyafajta.eredetinev}</p>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={()=>modosit(kutyafajta)}>Módosítás</button>
        <button className='btn btn-warning' onClick={()=>torles(kutyafajta)} >Törlés</button>
       
      </div>
    </div>
  </div>
  )
}

export default Kutyafajta