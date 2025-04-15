import { useContext } from "react";
import { useState, useEffect, createContext } from "react";
import { CartContext } from "./CartContext";
import axios from 'axios';
import { toast } from 'react-toastify';
//import OrderContext from "./OrderContext";
import secureStorage from "../utils/secureStorage";


const AuthContext=createContext();

export const AuthProvider=({children})=>{
    
    const [refresh,setRefresh]=useState(false);
    const [user,setUser]=useState(secureStorage.getItem('user'));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //const [profile, setProfile] = useState(sessionStorage.getItem('profile'));esti komment
    //const [profile, setProfile] = useState(secureStorage.getItem('profile') ? JSON.parse(secureStorage.getItem('profile')) : null);
    //const {setFormData} = useContext(OrderContext);
    const [profile, setProfile] = useState(JSON.parse(sessionStorage.getItem('profile')) || null);
    const token = sessionStorage.getItem('usertoken');
    const [roles, setRoles] = useState([]);

    //const user1 = secureStorage.getItem('user');

    console.log("321423 teszt",profile);
    console.log("324653456734564356 teszt", profile?.file_path);
  
    console.log('faszuserauthban',user);
    
    const {clearCart}=useContext(CartContext);


    useEffect(()=>{
      if (user){
       fetch(`${import.meta.env.VITE_BASE_URL}/profile/index`,{ 
         headers:{
           'Authorization':`Bearer ${token}`,
           'userId': user.id
         }
       })
       .then(res=>res.json())
       .then(adat=>{
        if (adat && adat.file_path) {
          setProfile(adat);
          sessionStorage.setItem("profile", JSON.stringify(adat)); // Csak ha van file_path
        } else {
          console.log("Nincs érvényes profil adat:", adat);
        }
       })
       .catch(err=>alert(err));
        }
       },[refresh]);

      /* useEffect(()=>{
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
          secureStorage.setItem('profile',JSON.stringify(adat));
          
        })
        .catch(err=>alert(err));
         }
        },[refresh]); */

        useEffect(()=>{
            if (user){
             fetch(`${import.meta.env.VITE_BASE_URL}/role`,{ 
               headers:{
                'Authorization': `Bearer ${token}`,
               }
             })
             .then(res=>res.json())
             .then(adat=>{
               setRoles(adat.roles);
               secureStorage.setItem('roles',JSON.stringify(adat.roles));
                console.log('roleslist',adat.roles);
               
               
             })
             .catch(err=>alert(err));
              }
             },[refresh]);

   

    const update=()=>{
        setRefresh(prev=>!prev);
    }

   //const login=()=>{
  //   sessionStorage.setItem('usertoken',token.access_token);
  //   sessionStorage.setItem('user',user);
  //   setIsLoggedIn(true);
  //   update();
   // }



    const logout=()=>{
        sessionStorage.removeItem('usertoken');
        //sessionStorage.removeItem('user');
        //sessionStorage.removeItem('profile');
        secureStorage.removeItem('user');
        sessionStorage.removeItem('profile');
        secureStorage.removeItem('roles');
        sessionStorage.removeItem('cartItems');
        clearCart();
        setIsLoggedIn(false);
        setUser(null);
        setProfile(null);
       
        update();
        toast.success('Logged out successfully');
    }

    const backendMuveletRole = async (data, method, url, header) => {
      try {
          const keres = await fetch(url, {
              method: method,
              headers: header,
              body: JSON.stringify(data),
              //body:data
          });

          const valasz = await keres.json();

          if (keres.ok) {
              toast.success('Sikeres adatfelvitel!');
          } else {
              toast.error(valasz.error || 'Valami hiba történt!');
          }

          update();

      } catch (error) {
          toast.error('Hálózati hiba történt!');
          console.error(error);
      }
  }
   

    return <AuthContext.Provider value={{
        refresh,
        update,
        logout,
        user,
        setUser,
        isLoggedIn,
        profile,
        setProfile,
        backendMuveletRole,
        roles,
        setRoles
        

    }}>{children}</AuthContext.Provider>

}
export default AuthContext;