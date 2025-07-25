import { toast } from "react-toastify";
import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AddressContext from "../../context/AddressContext";
import OrderContext from "../../context/OrderContext";
import secureStorage from "../../utils/secureStorage";

function CartCheckout() {
  const { areas, backendMuvelet, refresh } = useContext(AddressContext);
  const { formData, setFormData, setFormDataAddress } = useContext(OrderContext);
  const user = secureStorage.getItem("user");
  const token = sessionStorage.getItem("usertoken");
  const location = useLocation();

  useEffect(() => {
    if (user && formData.user_id !== user.id) {
      setFormData((prev) => ({
        ...prev,
        user_id: user.id,
      }));
    }
  }, [user, formData.user_id]);

  const [formData2, setFormData2] = useState({
    address_id: null,
  });

  const [addressess, setAddressess] = useState([]);
  const [minAddressId, setMinAddressId] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/address/${user.id}`, {
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddressess(data.addresses);
        if (data.addresses.length > 0) {
          const minId = Math.min(...data.addresses.map((address) => address.id));
          setMinAddressId(minId);
          setFormData2((prevState) => ({
            ...prevState,
            address_id: minId,
          }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsNewAddress(checked);

    if (!checked) {
      setFormData({
        city: "",
        zip: "",
        email: "",
        street_id: "",
        street: "",
        house_number: "",
        user_id: user ? user.id : null,
      });
    } else {
      // ha új címre vált, itt is biztosítjuk a user_id frissítését
      setFormData((prev) => ({
        ...prev,
        user_id: user ? user.id : null,
      }));
    }
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
    setFormDataAddress((prevState) => ({
      ...prevState,
      address_id: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isNewAddress && !formData.street_id) {
      toast.error("Kérjük, válassza ki a közterület jellegét!");
      return;
    }

    if (!isNewAddress) {
      toast.error("Kérjük, válasszon egy címet!");
      return;
    }
    const dataToSend = {
      city: formData.city,
      zip: formData.zip,
      email: formData.email,
      street_id: formData.street_id,
      street: formData.street,
      house_number: formData.house_number,
      user_id: formData.user_id,
    };




    if (isNewAddress) {
      backendMuvelet(dataToSend, "POST", `${import.meta.env.VITE_BASE_URL}/address`, {
        "Content-type": "application/json",
      });
    } else {
      // For existing address
      // backendMuvelet(formData2, "POST", `${import.meta.env.VITE_BASE_URL}/order`, {
      //  "Content-type": "application/json",
      //  });

    }
  };

  const isProfilePage = location.pathname === "/profile";



  return (
    <div className="w-full">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl text-left text-primary font-bold">Számlázási cím</h2>
            <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M15.93 18a1.47 1.47 0 0 1 .07.46c0 1.4-1.79 2.54-4 2.54s-4-1.14-4-2.54A1.47 1.47 0 0 1 8.07 18" className="stroke-[#005c6a] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M9 6a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3h0a3 3 0 0 0-3-3h0A3 3 0 0 0 9 6Zm3 3v8" className="stroke-[#50c6c9] fill-none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
          </div>
          
          <div className="divider divider-info"></div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-bold text-primary text-xl">Új címet adok meg</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary accent-white"
                checked={isNewAddress}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
          <div className="space-y-6">
            {isNewAddress ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <input
                      type="text"
                      id="city"
                      className="input input-bordered w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
                      placeholder="Város"
                      required
                      onChange={writeData}
                      value={formData.city}
                    />
                  </div>

                  <div className="form-control">
                    <input
                      type="number"
                      id="zip"
                      className="input input-bordered w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
                      placeholder="Írányítószám"
                      required
                      onChange={writeData}
                      value={formData.zip}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <input
                      type="email"
                      id="email"
                      className="input input-bordered w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
                      placeholder="Email"
                      required
                      onChange={writeData}
                      value={formData.email}
                    />
                  </div>

                  <div className="form-control">
                    <select
                      id="street_id"
                      className="select select-primary w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
                      onChange={writeData}
                      value={formData.street_id}
                    >
                      <option value="">Válasszon közterület jellegét</option>
                      {areas.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.public_area_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-control">
                    <input
                      type="text"
                      id="street"
                      className="input input-bordered w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info"
                      placeholder="Utca neve"
                      required
                      onChange={writeData}
                      value={formData.street}
                    />
                  </div>

                  <div className="form-control">
                    <input
                      type="text"
                      id="house_number"
                      className="input input-bordered w-full p-3 mt-2 border border-primary rounded-md text-info input-primary placeholder:text-info" 
                      placeholder="Házszám"
                      required
                      onChange={writeData}
                      value={formData.house_number}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="divider mt-10 divider-info"></div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-primary text-xl">Válassza ki a címet</span>
                  </label>
                  <select
                    id="address_id"
                    className="select select-bordered w-full p-3 mt-2 border border-primary rounded-md select-primary text-info"
                    onChange={writeData2}
                    value={formData2.address_id}
                  >
                    <option value="">Válasszon egy címet</option>
                    {addressess.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.zip} {address.city}, {address.street}{" "}
                        {address.street_type.public_area_name}{" "}
                        {address.house_number}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {isProfilePage && isNewAddress && (
              <div className="form-control mt-6">
                <button
                  type="button"
                  onClick={onSubmit}
                  className="btn btn-primary w-full py-3 text-white font-semibold rounded-md"
                >
                  Cím mentése
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCheckout;
