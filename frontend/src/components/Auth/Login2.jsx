import { useState } from "react";
import { createCookieSessionStorage, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Login2() {
  const navigate = useNavigate();
  const { update, setUser } = useContext(AuthContext);

  const kuldes = (formData, method) => {
    fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          sessionStorage.setItem("usertoken", data.access_token);
          //sessionStorage.setItem('user',data.user);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          console.log(data.user);
          update();
          setUser(data.user);
          //console.log(data.access_token);
          toast.success("Sikeres belépés");
          navigate("/");
        } else {
          toast.error(data.error);
        }
      })
      .catch((err) => toast.error(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    kuldes(formData, "POST");
  };

  let formObj = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(formObj);

  const writeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  // <input type="email" className="grow" placeholder="Adja meg a email címét" />
  //<input
  //type="password"
  //className="grow"
  //placeholder="Adja meg a jelszót"
  ///>

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <img src="src/img/Szirony2.png" alt="" />
          <h2 className="text-2xl font-bold text-center">Bejelentkezés</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email cím</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#00aab3" strokeWidth="2" strokeLinecap="round"></rect> </g></svg>
                <input className="grow"
                  type="email"
                  id="email"
                  placeholder="Felhasználói email"
                  required
                  onChange={writeData}
                  value={formData.email}
                />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Jelszó</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="11" width="18" height="11" rx="2" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect> <path d="M7 10.9999V6.99988C7 4.23845 9.23858 1.99988 12 1.99988V1.99988C14.7614 1.99988 17 4.23845 17 6.99988V10.9999" stroke="#00aab3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <input className="grow"
                  type="password"
                  id="password"
                  placeholder="Jelszó"
                  required
                  onChange={writeData}
                  value={formData.password}
                />
              </label>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Elfelejtette jelszavát?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Bejelentkezés
              </button>
            </div>
          </form>
          <div className="divider">VAGY</div>
          <div className="text-center">
            <p>Nincs fiókja?</p>
            <Link to="/register2" className="link link-primary">
              Regisztráljon most
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;
