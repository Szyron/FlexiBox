import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
    <div className="bg-base-200 flex items-center justify-center min-h-screen mt-2">
      <div className="card w-96 bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <img src="src/img/Szirony2.png" alt="" />
          <h2 className="text-2xl font-bold text-center">Regisztráció</h2>
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Vezetéknév</span>
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
                <span className="label-text">Keresztnév</span>
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
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Jelszó újra</span>
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
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Elfelejtette jelszavát?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Regisztráció
              </button>
            </div>
          </form>
          <div className="divider">VAGY</div>
          <div className="text-center">
            <p>Van fiókja?</p>
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
