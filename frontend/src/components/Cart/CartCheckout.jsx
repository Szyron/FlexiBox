import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useContext } from "react";
import AddressContext from "../../context/AddressContext";
import { useLocation, useNavigate } from "react-router-dom";
import OrderContext from "../../context/OrderContext";

function CartCheckout() {
  const navigate = useNavigate();
  const { areas, address, backendMuvelet, refresh } = useContext(AddressContext);
  const { formData, setFormData } = useContext(OrderContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionStorage.getItem("usertoken");
  const location = useLocation();




  /* const [formData, setFormData] = useState({
    city: "",
    zip: "",
    email: "",
    street_id: "",
    street: "",
    house_number: "",
    user_id: user ? user.id : null,
  }); */

  const [formData2, setFormData2] = useState({
    address_id: null,
  });

  const [addressess, setAddressess] = useState([]);
  const [minAddressId, setMinAddressId] = useState(null);
  const [isNewAddress, setIsNewAddress] = useState(false); // State for new address checkbox

  // Fetch addresses based on user id
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
    setIsNewAddress(e.target.checked);
    if (!e.target.checked) {
      // Reset the form data to default when switching to existing address mode
      setFormData({
        city: "",
        zip: "",
        email: "",
        street_id: "",
        street: "",
        house_number: "",
        user_id: user ? user.id : null,
      });
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
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (isNewAddress && !formData.street_id) {
      toast.error("Kérjük, válassza ki a közterület jellegét!");
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
      backendMuvelet(formData2, "POST", `${import.meta.env.VITE_BASE_URL}/order`, {
        "Content-type": "application/json",
      });
    }
  };

  const isProfilePage = location.pathname === "/profile";

  return (
    <div className="bg-base-200 flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-4xl bg-base-100 shadow-xl mt-5">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-left">Számlázási cím</h2>
          <div className="divider"></div>

          {/* Checkbox for selecting new address */}
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-bold">Új címet adok meg</span>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={isNewAddress}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>

          {/* Form based on address selection */}
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* New address form */}
            {isNewAddress ? (
              <div>
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
                      <span className="label-text">Közterület jellege</span>
                    </label>
                    <select
                      id="street_id"
                      className="select select-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      type="text"
                      id="house_number"
                      className="input input-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Házszám"
                      required
                      onChange={writeData}
                      value={formData.house_number}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // Existing address selection
              <div>
                <div className="divider mt-10"></div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold">Válassza ki a címet</span>
                  </label>
                  <select
                    id="address_id"
                    className="select select-bordered w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                type="submit"
                className="btn btn-primary w-full py-3 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cim mentese
              </button>
            </div>
  )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CartCheckout;
