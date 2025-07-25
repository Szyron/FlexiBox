import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { AdminProvider } from "./context/AdminContext";
import { AddressProvider } from "./context/AddressContext";
import { PaymentProvider } from "./context/PaymentContext";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import { CrudProvider } from "./context/CrudContext";
import { InitialProvider } from "./context/InitialContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "./components/Main";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import Register2 from "./components/Auth/Register2";
import Login2 from "./components/Auth/Login2";
import Profile from "./components/Auth/Profile";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import UserDashboard from "./components/Dashboards/UserDashboard";
import NewCategory from "./components/Categories/NewCategory";
import CategoriesList from "./components/Categories/CategoriesList";
import NewProduct from "./components/Products/NewProduct";
import ProductsList from "./components/Products/ProductsList";
import ProductsInfo from "./components/Products/ProductsInfo";
import CartView from "./components/Cart/CartView";
import RegistrationDataEdit from "./components/Dashboards/RegistrationDataEdit";
import NewPublicArea from "./components/Address/NewPublicArea";
import PublicAreaList from "./components/Address/PublicAreaList";
import OrderCheckout from "./components/Cart/OrderCheckout";
import NewPaymentMethod from "./components/Payments/NewPaymentMethod";
import PaymentMethodList from "./components/Payments/PaymentMethodList";
import UserOrder from "./components/Cart/UserOrder";
import NewRole from "./components/Roles/NewRole";
import RolesList from "./components/Roles/RolesList";
import NewLocker from "./components/Lockers/NewLocker";
import LockersList from "./components/Lockers/LockersList";
import AdminOrders from "./components/Dashboards/AdminOrders";
import MobileTableInfo from "./components/MobileTableInfo";


function App() {

  return (
    <div>
      <CrudProvider>
        <PaymentProvider>
          <AdminProvider>
            <CartProvider>
              <AuthProvider>
                <OrderProvider>
                  <ServiceProvider>
                    <AddressProvider>
                      <InitialProvider>
                        <BrowserRouter>
                          <Menu />
                          <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/register2" element={<Register2 />} />
                            <Route path="/login2" element={<Login2 />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/cart" element={<CartView />} />
                            <Route path="/checkout" element={<OrderCheckout />} />
                            <Route path="/userorder" element={<UserOrder />} />
                            <Route path="/adminorders" element={<AdminOrders />} />
                            <Route path="/newpaymentmethod" element={<NewPaymentMethod />} />
                            <Route path="/paymentmethods" element={<PaymentMethodList />} />
                            <Route path="/newrole" element={<NewRole />} />
                            <Route path="/roles" element={<RolesList />} />
                            <Route path="/newpublicarea" element={<NewPublicArea />} />
                            <Route path="/publicareas" element={<PublicAreaList />} />
                            <Route path="/newcategory" element={<NewCategory />} />
                            <Route path="/newlocker" element={<NewLocker />} />
                            <Route path="/categories" element={<CategoriesList />} />
                            <Route path="/newproduct" element={<NewProduct />} />
                            <Route path="/lockers" element={<LockersList />} />
                            <Route path="/products" element={<ProductsList />} />
                            <Route path="/productsinfo" element={<ProductsInfo />} />
                            <Route path="/admindashboard" element={<AdminDashboard />} />
                            <Route path="/userdashboard" element={<UserDashboard />} />
                            <Route path="/userorder" element={<UserOrder />} />
                            <Route path="/registrationdataedit" element={<RegistrationDataEdit />} />
                            <Route path="/info" element={<MobileTableInfo />} />
                            <Route path="*" element={<Navigate to="/" />} />  
                          </Routes>
                          <Footer />
                        </BrowserRouter>
                      </InitialProvider>
                    </AddressProvider>
                  </ServiceProvider>
                </OrderProvider>
              </AuthProvider>
            </CartProvider>
          </AdminProvider>
        </PaymentProvider>
      </CrudProvider>
      <ToastContainer />
    </div>
  )
}

export default App
