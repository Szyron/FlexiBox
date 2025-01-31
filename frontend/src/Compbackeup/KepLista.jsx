import React from 'react'
import KepCard from './KepCard'
import { useState } from 'react';
import { useEffect } from 'react';




function KepLista() {
  const [kepLista, setKepLista]=useState([]);

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/api/images`)
    .then((response)=>response.json())
    .then((data)=>setKepLista(data.images))
  },[]);




  return (
    <div>
    <h1 className="text text-3xl font-bold text-center">KépLista:</h1>
    <div className="flex flex-row flex-wrap items-center justify-center">
    {
   kepLista.map((kep)=>(<KepCard key={kep.id} kep={kep}/>))
}

     </div>

     
 </div>
  )
}

export default KepLista