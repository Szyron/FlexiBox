import { useContext, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import TermekContext from "../context/TermekContext";



function UjTermek() {

  const {backendMuvelet}=useContext(TermekContext);
    const navigate = useNavigate();
    const {state}=useLocation();
    let cim="Új termék felvitele";
    let method="POST";
    let formObj={
        id:"",
        termeknev:"",
        termekar:""
    };

    let url=`${import.meta.env.VITE_BASE_URL}/api/products`;

    if (state!==null){
        const{termek}=state;
        formObj={
            id:termek.id,
            termeknev:termek.termeknev,
            termekar:termek.termekar
        }
        method="PATCH";
        cim=`${termek.termeknev} termék módosítás `;
    }

    const [formData, setFormData]=useState(formObj);

    const writeData=(e)=>{
        setFormData((prevState)=>({...prevState,[e.target.id]:e.target.value}));
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        backendMuvelet(formData,method,url);
        navigate("/termeklista");
    }

  return (
    <div className="">
    <h1 className="text-3xl font-bold text-center my-10">{cim}</h1>
    <form onSubmit={onSubmit} className="flex flex-col items-center justify-center my-5">
        <input type="text" required id="termeknev" value={formData.termeknev} onChange={writeData} placeholder="Termek neve" className="input input-bordered w-full max-w-xs" />
        <input type="text" required id="termekar" value={formData.termekar} onChange={writeData} placeholder="Termék ára" className="input input-bordered w-full max-w-xs" />
        <button type="submit" className="btn btn-primary">Küldés</button>

    </form>
     </div>
  )
}

export default UjTermek