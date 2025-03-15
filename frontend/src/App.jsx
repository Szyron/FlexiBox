
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import Register2 from "./components/Auth/Register2";
import Login2 from "./components/Auth/Login2";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Auth/Profile";
import AdminDashboard from "./components/Dashboards/AdminDashboard";
import UserDashboard from "./components/Dashboards/UserDashboard";
import NewCategory from "./components/Categories/NewCategory";
import CategoriesList from "./components/Categories/CategoriesList";
import NewProduct from "./components/Products/NewProduct";
import ProductsList from "./components/Products/ProductsList";
import ProductsInfo from "./components/Products/ProductsInfo";
import CartView from "./components/Cart/CartView";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import RegistrationDataEdit from "./components/Dashboards/RegistrationDataEdit";
import { AdminProvider } from "./context/AdminContext";
import NewPublicArea from "./components/Address/NewPublicArea";
import { AddressProvider } from "./context/AddressContext";
import PublicAreaList from "./components/Address/PublicAreaList";
import OrderCheckout from "./components/Cart/OrderCheckout";
import { PaymentProvider } from "./context/PaymentContext";
import NewPaymentMethod from "./components/Payments/NewPaymentMethod";
import PaymentMethodList from "./components/Payments/PaymentMethodList";
import UserOrder from "./components/Cart/UserOrder";
import NewRole from "./components/Roles/NewRole";
import RolesList from "./components/Roles/RolesList";








function App() {
  

  return (
   <div>
    
    <PaymentProvider>
    <AdminProvider>
    <CartProvider>
     <OrderProvider>
     <AuthProvider>
     <ServiceProvider>
      <AddressProvider>
     <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register2" element={<Register2/>}/>
        <Route path="/login2" element={<Login2/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<CartView/>}/>
        <Route path="/checkout" element={<OrderCheckout/>}/>
        <Route path="/userorder" element={<UserOrder/>}/>
        <Route path="/newpaymentmethod" element={<NewPaymentMethod/>}/>
        <Route path="/paymentmethods" element={<PaymentMethodList/>}/>
        <Route path="/newrole" element={<NewRole/>}/>
        <Route path="/roles" element={<RolesList/>}/>
        <Route path="/newpublicarea" element={<NewPublicArea/>}/>
        <Route path="/publicareas" element={<PublicAreaList/>}/>
        <Route path="/newcategory" element={<NewCategory/>}/>
        <Route path="/categories" element={<CategoriesList/>}/>
        <Route path="/newproduct" element={<NewProduct/>}/>
        <Route path="/products" element={<ProductsList/>}/>
        <Route path="/productsinfo" element={<ProductsInfo/>}/> 
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/userdashboard" element={<UserDashboard/>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
        <Route path="/registrationdataedit" element={<RegistrationDataEdit/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
      </AddressProvider>
      </ServiceProvider>
      </AuthProvider>
      <ToastContainer/>
      </OrderProvider>
      </CartProvider>
      </AdminProvider>
      </PaymentProvider>
    
    
   </div>
  )
}

export default App
