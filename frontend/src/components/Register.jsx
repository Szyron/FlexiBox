import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Register() {
    const navigate = useNavigate();

    const kuldes = (formData, method) => {
      const dataToSend = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.passwordAgain
      };
  
      fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
        method: method,
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(dataToSend)
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          sessionStorage.setItem('usertoken', data.token);
          toast.success("Sikeres regisztráció!");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      })
      .catch(error => {
        toast.error("An error occurred. Please try again.");
        console.error("Error:", error);
      });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();

      if (formData.password !== formData.passwordAgain) {
        toast.error("Passwords do not match!");
        return;
      }
      //console.log(formData);
      kuldes(formData, 'POST');
    };
  
    let formObj = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordAgain: ""
    };
  
    const [formData, setFormData] = useState(formObj);
  
    const writeData = (e) => {
      setFormData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };

  return (
    <div className="container mx-auto justify-center flex flex-col items-center p-4">
      <h2 className="font-bold text-3xl text-center mb-5">Regisztráció</h2>
      <form className="flex flex-col gap-4 rounded-lg p-4 bg-base-200 w-full max-w-md" onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">Keresztnév</label>
          <input
            type="text"
            id="first_name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Keresztnév"
            required
            onChange={writeData}
            value={formData.first_name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">Vezetéknév</label>
          <input
            type="text"
            id="last_name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Vezetéknév"
            required
            onChange={writeData}
            value={formData.last_name}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Email"
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
        <div className="mb-4">
          <label htmlFor="passwordAgain" className="block mb-2 text-sm font-medium text-gray-900">Jelszó újra</label>
          <input
            type="password"
            id="passwordAgain"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
            placeholder="Jelszó újra"
            required
            onChange={writeData}
            value={formData.passwordAgain}
          />
        </div>
        <div className="flex justify-center gap-4">
          <button type="submit" className="btn bg-sky-400 rounded-btn">Regisztráció</button>
        </div>
      </form>
    </div>
  );
}

export default Register;