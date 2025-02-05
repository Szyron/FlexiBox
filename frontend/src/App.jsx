
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import Register2 from "./components/Register2";
import Login2 from "./components/Login2";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import NewCategory from "./components/NewCategory";
import CategoriesList from "./components/CategoriesList";
import NewProduct from "./components/NewProduct";
import ProductsList from "./components/ProductsList";
import ProductsInfo from "./components/ProductsInfo";
import CartView from "./components/CartView";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";








function App() {
  

  return (
   <div>
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
      </Routes>
      </BrowserRouter>
      </ServiceProvider>
      </AuthProvider>
      <ToastContainer/>
      </CartProvider>
      </OrderProvider>
    
   </div>
  )
}

export default App
