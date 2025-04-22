import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register2() {
  const navigate = useNavigate();

  const kuldes = (formData, method) => {
    const dataToSend = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.passwordAgain,
    };

    fetch(`${import.meta.env.VITE_BASE_URL}/register`, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          sessionStorage.setItem("usertoken", data.token);
          toast.success("Sikeres regisztráció!");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error("Hiba történt a regisztráció során!", error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordAgain) {
      toast.error("Jelszavak nem egyeznek!");
      return;
    }
    kuldes(formData, "POST");
  };

  let formObj = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordAgain: "",
  };

  const [formData, setFormData] = useState(formObj);

  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen mt-2 text-info">
      <div className="card w-96 bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center text-primary">Regisztráció</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none"><path d="M11,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v0a7,7,0,0,1,7-7Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="8" r="5" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <input
                  type="text"
                  id="last_name"
                  className="grow"
                  placeholder="Vezetéknév"
                  required
                  onChange={writeData}
                  value={formData.last_name}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none"><path d="M11,13h2a7,7,0,0,1,7,7v0a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1v0a7,7,0,0,1,7-7Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="8" r="5" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <input
                  type="text"
                  id="first_name"
                  className="grow"
                  placeholder="Keresztnév"
                  required
                  onChange={writeData}
                  value={formData.first_name}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-[17px]" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="1" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20.62,5.22l-8,6.29a1,1,0,0,1-1.24,0l-8-6.29A1,1,0,0,1,4,5H20A1,1,0,0,1,20.62,5.22Z" className="[stroke:#00aab3]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <input
                  type="email"
                  id="email"
                  className="grow"
                  placeholder="Email"
                  required
                  onChange={writeData}
                  value={formData.email}
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="11" rx="2" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect> <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <input
                  type="password"
                  id="password"
                  className="grow"
                  placeholder="Jelszó"
                  required
                  onChange={writeData}
                  value={formData.password}
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label">
              </label>
              <label className="input input-bordered flex items-center gap-2 border-primary">
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="11" rx="2" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect> <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <input
                  type="password"
                  id="passwordAgain"
                  className="grow"
                  placeholder="Jelszó újra"
                  required
                  onChange={writeData}
                  value={formData.passwordAgain}
                />
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary text-white">
                Regisztráció
              </button>
            </div>
          </form>
          <div className="divider divider-info text-primary">VAGY</div>
          <div className="text-center">
            <p className="text-info">Van fiókja?</p>
            <Link to="/login2" className="link link-primary">
              Jelentkezzen be
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register2;
