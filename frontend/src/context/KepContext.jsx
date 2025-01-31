import { useState, useEffect, createContext } from "react";

const KepContext=createContext();

export const KepProvider=({children})=>{
    const [kep,setKep]=useState();


    return <KepContext.Provider value={{
        kep,
        setKep
    }}>{children}</KepContext.Provider>

}
export default KepContext;
