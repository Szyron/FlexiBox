import { useContext, useState } from "react";
import KutyaContext from "../context/KutyaContext";
import {useNavigate, useLocation} from "react-router-dom";



function KutyafajtaForm() {

    const {backendMuvelet}=useContext(KutyaContext);
    const navigate = useNavigate();
    const {state}=useLocation();
    let cim="Új fajta felvitele";
    let method="POST";
    let formObj={
        Id:"",
        nev:"",
        eredetinev:""
    };
    let url=`${import.meta.env.VITE_BASE_URL}/kutyafajtak`;

    if (state!==null){
        const{kutyafaja}=state;
        formObj={
            Id:kutyafaja.Id,
            nev:kutyafaja.nev,
            eredetinev:kutyafaja.eredetinev
        }
        method="PATCH";
        cim=`${kutyafaja.nev} fajtanév módosítás `;
    }

    const [formData, setFormData]=useState(formObj);

    const writeData=(e)=>{
        setFormData((prevState)=>({...prevState,[e.target.id]:e.target.value}));

    }

    

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        backendMuvelet(formData,method,url);
        navigate("/kutyafajtak");
    }





  return (
    <div className="">
    <h1 className="text-3xl font-bold text-center my-10">{cim}</h1>
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5">
        <input type="text" required id="nev" value={formData.nev} onChange={writeData} placeholder="fajta neve" className="input input-bordered w-full max-w-xs" />
        <input type="text" required id="eredetinev" value={formData.eredetinev} onChange={writeData} placeholder="fajta eredeti neve" className="input input-bordered w-full max-w-xs" />
        
        <button type="submit" className="btn btn-primary">Küldés</button>

    </form>
 </div>
  )
}

export default KutyafajtaForm