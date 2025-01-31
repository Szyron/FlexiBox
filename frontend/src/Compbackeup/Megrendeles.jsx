import React from 'react';
import TermekContext from '../context/TermekContext';
import {useContext} from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';



function Megrendeles() {
    const {termekLista,backendMuvelet}=useContext(TermekContext);
    const navigate=useNavigate();

    let formObj={
        id:"",
        product_id:1,
        quantity:"",
    };

    let url=`${import.meta.env.VITE_BASE_URL}/api/orderItems`;
    let method="POST";

    const [formData, setFormData]=useState(formObj);
    
    const writeData=(e)=>{
            setFormData((prevState)=>({...prevState,[e.target.id]:e.target.value}));
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        backendMuvelet(formData,method,url);
        navigate("/megrendelesLista");
    }

   

  return (
    <div>
       <h1 className="text-3xl font-bold text-center my-10">Megrendelés</h1>
        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5">
        <select className="select select-bordered w-full max-w-xs m-2" id="product_id" onChange={writeData} value={formData.product_id}>
            {
                termekLista.map((termek)=>(<option key={termek.id} value={termek.id}>{termek.termeknev}</option>))
            }

        </select>
        <input type="number" id="quantity" onChange={writeData} value={formData.quantity} className="input input-bordered w-full max-w-xs m-2" placeholder="Mennyiség"/>
        <button type="submit" className="btn btn-primary">Küldés</button>
      
  
      </form>
    </div>
    
  )
}

export default Megrendeles