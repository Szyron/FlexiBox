import { useState, useEffect, createContext } from "react";

const TermekContext=createContext();

export const TermekProvider=({children})=>{
    const [user,setUser]=useState(
        {
            username:"John",
            role:"Admin"

        }
    );
    const [refresh,setRefresh]=useState(false);
    const [termekLista,setTermekLista]=useState([]);
    const [megrendelesLista,setMegrendelesLista]=useState([]);

    const update =()=>{
        setRefresh(prev=>!prev)
    }

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/api/products`)
        .then(res=>res.json())
        .then(adat=>setTermekLista(adat))
        .catch(err=>alert(err));
    },[refresh]);

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/api/orderItems`)
        .then(res=>res.json())
        .then(adat=>setMegrendelesLista(adat))
        .catch(err=>alert(err));
    },[refresh]);

   

    
    const backendMuvelet= async (adat,method,url)=>{
        const keres = await fetch (url,{
            method:method,
            headers:{"content-type":"application/json"},
            body:JSON.stringify(adat)
        });

        const valasz=await keres.text();
        update();
        alert(valasz);
    }



    return <TermekContext.Provider value={{
        user,
        termekLista,
        megrendelesLista,
        update,
        backendMuvelet

    }}>{children}</TermekContext.Provider>

}

export default TermekContext;
