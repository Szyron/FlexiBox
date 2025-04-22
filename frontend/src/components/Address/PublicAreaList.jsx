import React from "react";
import PublicAreaCard from "./PublicAreaCard";
import AddressContext from "../../context/AddressContext";
import { useContext } from "react";
import { useEffect, useState } from "react";
import CrudContext from "../../context/CrudContext";
import { use } from "react";
import InitialContext from "../../context/InitialContext";

function PublicAreaList() {
//const {areas} = useContext(AddressContext);
const { areas } = useContext(InitialContext);

   
  return (
    <div className="bg-base-200 min-h-screen p-4">
         <h1 className="text-3xl font-bold text-center mb-4 text-primary">Közterület neveinek Listája</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
        {
            areas.map((area)=>(<PublicAreaCard key={area.id} publicarea={area}/>))
        }

          </div>
    
          
      </div>
  )
}

export default PublicAreaList