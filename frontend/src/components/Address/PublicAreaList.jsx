import React from 'react'
import PublicAreaCard from './PublicAreaCard'
import AddressContext from '../../context/AddressContext'
import {useContext} from 'react'

function PublicAreaList() {
    const {areas} = useContext(AddressContext);
  return (
    <div className="bg-base-200 min-h-screen">
         <h1 className="text text-3xl font-bold text-center p-10 text-secondary">Közterület neveinek Listája:</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
        {
            areas.map((area)=>(<PublicAreaCard key={area.id} publicarea={area}/>))
        }

          </div>
    
          
      </div>
  )
}

export default PublicAreaList