import React from 'react'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import AddressContext from '../../context/AddressContext';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { useEffect } from 'react';
import { use } from 'react';


function CartCheckout() {
  const navigate = useNavigate();
  const {areas, update, address,backendMuvelet} = useContext(AddressContext);
  //const token = localStorage.getItem('userToken');
 // const {user, setUser} = useContext(AuthContext);
 const token = sessionStorage.getItem('usertoken');
 const user = JSON.parse(sessionStorage.getItem('user'));

  

  // console.log('Address:', address);
  
  // useEffect(() => {
  //   update();
  // }, []);

  // useEffect(() => {
  //   console.log('AuthContext user:', user);
  // }, [user]);


  let method = "POST";
  let header = {"Content-type": "application/json"};
  let url = `${import.meta.env.VITE_BASE_URL}/address`;




  console.log('fasza',user);

  let formObj = {
    city: "",
    zip: "",
    email: "",
    street_id: "",
    street: "",
    house_number: "",
    user_id: user ? user.id : null
  };
 
  const [formData, setFormData] = useState(formObj);

    const dataToSend = {
      city: formData.city,
      zip: formData.zip,
      email: formData.email,
      street_id: formData.street_id,
      street: formData.street,
      house_number: formData.house_number,
      user_id: formData.user_id

    };

    

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.street_id) {
  //     toast.error('Kérjük, válassza ki a közterület jellegét!');
  //     return;
  //   }
   
  //   console.log(formData);
  //   backendMuvelet(dataToSend,method,url,header);
  //   //backendMuvelet(dataToSend,"POST",`${import.meta.env.VITE_BASE_URL}/address`,{ "Content-type": "application/json" });
  // };


 //const token = sessionStorage.getItem('usertoken');
 //const user = JSON.parse(sessionStorage.getItem('user'));
 //const {user} = useContext(AuthContext);
  const [addressess, setAddressess] = useState([]);
  const [minAddressId, setMinAddressId] = useState(null); 
  console.log('userdatachechout',user);
  console.log('token',token);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/address/${user.id}`, {
      headers: {'content-type': 'application/json' 
        //'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAddressess(data.addresses);
        if (data.addresses.length > 0) {
          const minId = Math.min(...data.addresses.map(address => address.id));
          setMinAddressId(minId);
          setFormData2(prevState => ({
            ...prevState,
            address_id: minId
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  
  const [formData2, setFormData2] = useState({
    address_id: minAddressId
  });

  const onSubmit = (e) => {
    e.preventDefault();
      if (!formData.street_id) {
      toast.error('Kérjük, válassza ki a közterület jellegét!');
      return;
    }
    console.log('Form datalista:', formData2);
    console.log('Form datauj:', formData);
  };

  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const writeData2 = (e) => {
    setFormData2((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    
    <div className="bg-base-200 flex items-center justify-center min-h-screen mt-2">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Cím Felvitele</h2>
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Két oszlopos elrendezés - Város és Irányítószám */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Város</span>
                </label>
                <input
                  type="text"
                  id="city"
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Város"
                  required
                  onChange={writeData}
                  value={formData.city}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Írányítószám</span>
                </label>
                <input
                  type="number"
                  id="zip"
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Írányítószám"
                  required
                  onChange={writeData}
                  value={formData.zip}
                />
              </div>
            </div>

            {/* Két oszlopos elrendezés - Email cím és Közterület jellege */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email cím</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email"
                  required
                  onChange={writeData}
                  value={formData.email}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Közterület jellege:</span>
                </label>
                <select
                  id="street_id"
                  className="select select-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={writeData} value={formData.street_id}
                >
                <option value="">Válasszon közterület jellegét</option>
                {
                    areas.map((area) => ( <option key={area.id} value={area.id}>{area.public_area_name}</option>))
                } 
                </select>
              </div>
            </div>

            {/* Két oszlopos elrendezés - Utca és Házszám */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Utca</span>
                </label>
                <input
                  type="text"
                  id="street"
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Utca"
                  required
                  onChange={writeData}
                  value={formData.street}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Házszám</span>
                </label>
                <input
                  type="number"
                  id="house_number"
                  className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Házszám"
                  required
                  onChange={writeData}
                  value={formData.house_number}
                />
              </div>
            </div>

            {/* Submit gomb */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cím felvitele
              </button>
            </div>
          </form>
          <div className="divider">VAGY</div>
          <div>
    <form onSubmit={onSubmit}>
      <select
                  id="address_id"
                  className="select select-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={writeData2} value={formData2.address_id}
                >
               {addressess.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.street} {address.house_number}, {address.city}
                </option>
              ))}
                </select>
                <button
                type="submit"
                className="btn btn-primary w-full py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cím felvitele
              </button>
                </form>
        </div>
                {/* <div>
  {address.map((addres) => (
    <h1 key={addres.id} className="text-lg font-semibold">
      {addres.street} {addres.house_number}, {addres.city}
    </h1>
  ))}
</div> */}
          <div className="text-center">
         
            <button to="/login2" className="link link-primary">
              Jelentkezzen be
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartCheckout