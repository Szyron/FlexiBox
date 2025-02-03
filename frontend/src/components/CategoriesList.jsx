import React from 'react'
import { useContext } from 'react';
import CategoriesCard from './CategoriesCard'
import ServiceContext from '../context/ServiceContext';

function CategoriesList() {

    const {categories}=useContext(ServiceContext);


  return (
    <div className="bg-secondary min-h-screen">
         <h1 className="text text-3xl font-bold text-center">Kategória Lista:</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
        {
            categories.map((category)=>(<CategoriesCard key={category.id} category={category}/>))
        }

          </div>
    
          
      </div>
  )
}

export default CategoriesList