import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
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
