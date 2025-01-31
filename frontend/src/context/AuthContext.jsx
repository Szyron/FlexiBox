import { use } from "react";
import { useState, useEffect, createContext } from "react";



const AuthContext=createContext();

export const AuthProvider=({children})=>{
    
    const [refresh,setRefresh]=useState(false);
    const [user,setUser]=useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState(null);
    
      useEffect(()=>{
       if (user){
        fetch(`${import.meta.env.VITE_BASE_URL}/profile/${user.id}`,{ 
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        })
        .then(res=>res.json())
        .then(adat=>{
          setProfile(adat);
          //console.log(adat.file_path);
          
        })
        .catch(err=>alert(err));
         }
        },[refresh]);

    
    
    

    

    const update=()=>{
        setRefresh(prev=>!prev);
    }

   const login=()=>{
    sessionStorage.setItem('usertoken',token.access_token);
    sessionStorage.setItem('user',user);
    setIsLoggedIn(true);
    update();
   
    }



    const logout=()=>{
        sessionStorage.removeItem('usertoken');
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        update();
        setUser(null);
        setProfile(null);
    }
   

    return <AuthContext.Provider value={{
        refresh,
        update,
        login,
        logout,
        user,
        setUser,
        isLoggedIn,
        profile,
        setProfile
        

    }}>{children}</AuthContext.Provider>

}
export default AuthContext;
