import { useContext, useState } from "react";
import KutyaContext from "../context/KutyaContext";
import {useNavigate, useLocation} from "react-router-dom";



function KutyanevForm() {

    const {backendMuvelet}=useContext(KutyaContext);
    const navigate = useNavigate();
    const {state}=useLocation();
    let cim="Új kutyanev felvitele";
    let method="POST";
    let formObj={
        Id:"",
        kutyanev:"",
    };
    let url=`${import.meta.env.VITE_BASE_URL}/kutyanevek`;

    if (state!==null){
        const{kutyanev}=state;
        formObj={
            Id:kutyanev.Id,
           kutyanev:kutyanev.kutyanev,
           
        }
        method="PATCH";
        cim=`${kutyanev.kutyanev} kutyanev módosítás `;
    }

    const [formData, setFormData]=useState(formObj);

    const writeData=(e)=>{
        setFormData((prevState)=>({...prevState,[e.target.id]:e.target.value}));

    }

    

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        backendMuvelet(formData,method,url);
        navigate("/kutyanevek");
    }

  return (
    <div className="">
    <h1 className="text-3xl font-bold text-center my-10">{cim}</h1>
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5">
        <input type="text" required id="nev" value={formData.kutyanev} onChange={writeData} placeholder="fajta neve" className="input input-bordered w-full max-w-xs" />
        
        <button type="submit" className="btn btn-primary">Küldés</button>

    </form>
 </div>
  )
}

export default KutyanevForm