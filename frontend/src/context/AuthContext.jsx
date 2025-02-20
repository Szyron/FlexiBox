import { use, useContext } from "react";
import { useState, useEffect, createContext } from "react";
import { CartContext } from "./CartContext";
import axios from 'axios';



const AuthContext=createContext();

export const AuthProvider=({children})=>{
    
    const [refresh,setRefresh]=useState(false);
    const [user,setUser]=useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState(sessionStorage.getItem('profile') ? JSON.parse(sessionStorage.getItem('profile')) : null);
    
    const token = sessionStorage.getItem('usertoken');
    
    const {clearCart}=useContext(CartContext);

      useEffect(()=>{
       if (user){
        fetch(`${import.meta.env.VITE_BASE_URL}/profile/index`,{ 
          headers:{
           //Authorization:`Bearer ${user.token}`,
           'Authorization': `Bearer ${token}`,
            'user_id':user.id
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
        sessionStorage.removeItem('profile');
        clearCart();
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
