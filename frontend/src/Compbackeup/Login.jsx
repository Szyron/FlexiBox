import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {useContext} from 'react';
import AuthContext from '../context/AuthContext';


function Login() {
  const navigate=useNavigate();
  const {update,setUser}=useContext(AuthContext);
 


  const kuldes=(formData,method)=>{
    fetch(`${import.meta.env.VITE_BASE_URL}/login`,{
      method:method,
      headers:{"Content-type":"application/json"},
      body:JSON.stringify(formData)
    })
    .then(res=>res.json())
    .then(data=>{
      if(!data.error){
       sessionStorage.setItem('usertoken', data.access_token);
       //sessionStorage.setItem('user',data.user);
       sessionStorage.setItem('user', JSON.stringify(data.user));
       console.log(data.user);
        update();
        setUser(data.user);
       //console.log(data.access_token);
        toast.success('Sikeres belépés');
        navigate('/');
        

      } else {
        toast.error(data.error);
        
      }
    }).catch(err=>toast.error(err));
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    kuldes(formData,'POST');

  }

  let formObj={
    email:"",
    password:""
  }

  const [formData,setFormData]=useState(formObj);

  const writeData=(e)=>{
    setFormData((prevState)=>({...prevState,[e.target.id]:e.target.value}));
  }


  return (
    <div className="container mx-auto justify-center flex flex-col items-center p-4">
      <h2 className="font-bold text-3xl text-center mb-5">Belépés</h2>
      <form className="flex flex-col gap-4 rounded-lg p-4 bg-base-200 w-full max-w-md" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Felhasználói név</label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Felhasználói email"
            required
            onChange={writeData}
            value={formData.email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Jelszó</label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Jelszó"
            required
            onChange={writeData}
            value={formData.password}
          />
        </div>
        <div className="flex justify-center gap-4">
          <button type="submit" className="btn bg-sky-400 rounded-btn">Belépés</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
