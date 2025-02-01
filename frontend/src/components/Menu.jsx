import React from 'react';
import {Link} from "react-router-dom";
import {useContext,useState,useEffect} from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";




function Menu() {
 const user=JSON.parse(sessionStorage.getItem('user'));
 const {logout,update, profile}=useContext(AuthContext);
  
 
  
 
  
  const navigate = useNavigate();

 

  const handleLogout = () => {
    logout();
    navigate('/');
    update();
  };

   
    
  return (
    <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">daisyUI</Link>
  </div>
  <div>
          {user ? (
          <>
          {user.isadmin >=70 && <Link to="/admindashboard">Admin Dashboard</Link>}
          
          {user.isadmin >10 && user.isadmin < 70 && (<Link to="/userdashboard" className="justify-between">
            User Dashboard
            </Link>)}
          
          
          
          </>
          ):(
          <>
         <Link to="/" className="justify-between">
            Guest
            </Link>
          </>)}
        
  </div>

  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>
    <div className='m-10'>
      { 
        user ? ( 
          <>
          <h1>Hello, {user.first_name} </h1>
          </>
        )
          : (
            <>
          <h1>Hello,Guest </h1>
          </>
          )
        
      }
      
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
         
          
        { profile && profile.file_path ? (
        <>
        <img
     src={`${import.meta.env.VITE_LARAVEL_IMAGE_URL}${profile.file_path}`} 
    
      //src={`http://localhost:8000/storage/images/1738181966_profileimage.jpg`} 
      alt="Pofile" />
        
        </>

        ):(
        <>
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </>
        )}
        </div>
      </div>

    {
      (user!==null ? 
        <>
        <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile"className="justify-between">
            Profile
           
          </Link>
        </li>
       
        <li><a onClick={handleLogout} >Logout</a></li>
      </ul>
      </>
      :
      <>
      <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
      <li>
        <Link to="/register2" className="justify-between">
          Register
         
        </Link>
      </li>
     
      <li><Link to="/login2">Login</Link></li>
    </ul>
    </>


      )
    }

     
    </div>
  </div>
</div>
  )
}

export default Menu