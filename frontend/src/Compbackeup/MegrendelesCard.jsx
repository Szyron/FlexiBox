import React from 'react'
import {useContext} from 'react';
import TermekContext from '../context/TermekContext';
import {useNavigate} from 'react-router-dom';


function MegrendelesCard({megrendeles}) {
    const navigate=useNavigate();
    const {backendMuvelet}=useContext(TermekContext);
  
    const modosit =()=>{
      navigate("/megrendeles", {state:{megrendeles}});
    }
    
    const torles=(termek)=>{
      //backendMuvelet(termek, "DELETE",`${import.meta.env.VITE_BASE_URL}/api/products/${termek.id}`);
    }

  return (
    <div className="card bg-sky-200 text-sky-800 m-5 w-96">
    <div className="card-body">
      <h2 className="card-title">Megrendelés Item id:{megrendeles.id}</h2>
        <p>Termék neve: {megrendeles.product.termeknev}</p>
        <p>Termék mennyiség: {megrendeles.quantity}</p>
      <div className="card-actions justify-end">
        <button className='btn btn-primary' onClick={()=>modosit(megrendeles)}>Módosítás</button>
        <button className='btn btn-warning' onClick={()=>torles(megrendeles)} >Törlés</button>
       
      </div>
    </div>
  </div>
  )
}

export default MegrendelesCard