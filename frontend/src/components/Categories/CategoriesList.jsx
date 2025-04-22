import React from 'react'
import { useContext } from 'react';
import CategoriesCard from './CategoriesCard'
import ServiceContext from '../../context/ServiceContext';
import InitialContext from '../../context/InitialContext';

function CategoriesList() {

   
//const {categories}=useContext(ServiceContext);
const { categories } = useContext(InitialContext);

  return (
    <div className="bg-base-200 min-h-screen p-4">
         <h1 className="text-3xl font-bold text-center mb-4 text-primary">Kategória Lista</h1>
         <div className="flex flex-row flex-wrap items-center justify-center">
        {
            categories.map((category)=>(<CategoriesCard key={category.id} category={category}/>))
        }

          </div>
    
          
      </div>
  )
}

export default CategoriesList