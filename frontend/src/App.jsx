
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







function App() {
  

  return (
   <div>
    <AdminProvider>
     <OrderProvider>
    <CartProvider>
     <AuthProvider>
     <ServiceProvider>
     <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register2" element={<Register2/>}/>
        <Route path="/login2" element={<Login2/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<CartView/>}/>
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
      </ServiceProvider>
      </AuthProvider>
      <ToastContainer/>
      </CartProvider>
      </OrderProvider>
      </AdminProvider>
    
   </div>
  )
}

export default App
