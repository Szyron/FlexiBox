import React from 'react'
import { useContext } from 'react';
import TermekContext  from '../context/TermekContext';
import MegrendelesCard from './MegrendelesCard';


function MegrendelesLista() {
    const {megrendelesLista}=useContext(TermekContext);
   
  return (
    <div>
         <h1 className="text text-3xl font-bold text-center">MegrendelesLista:</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
         {
        megrendelesLista.map((megrendeles)=>(<MegrendelesCard key={megrendeles.id} megrendeles={megrendeles}/>))
}

          </div>
    
          
      </div>
  )
}

export default MegrendelesLista