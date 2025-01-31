import React from 'react'
import { useContext } from 'react';
import TermekContext  from '../context/TermekContext';
import Termek from './Termek';


function TermekLista() {
  const {termekLista}=useContext(TermekContext);


  
  return (
    <div>
         <h1 className="text text-3xl font-bold text-center">TermékLista:</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
         {
        termekLista.map((termek)=>(<Termek key={termek.id} termek={termek}/>))
}

          </div>
    
          
      </div>

  )
}

export default TermekLista