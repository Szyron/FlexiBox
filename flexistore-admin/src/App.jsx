import Menu from "./components/Menu"
import SideMenu from "./components/SideMenu";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewCategory from "./components/Categories/NewCategory";
import { CrudProvider } from "../../flexistore-frontend/src/context/CrudContext";
import { InitialProvider } from "../../flexistore-frontend/src/context/InitialContext";
import { ServiceProvider } from "../../flexistore-frontend/src/context/ServiceContext";
import NewProduct from "./components/Products/NewProduct";
import NewLocker from "./components/Lockers/NewLocker";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NewPublicArea from "./components/Address/NewPublicArea"
import NewPaymentMethod from "./components/Payments/NewPaymentMethod";
import { PaymentProvider } from "../../flexistore-frontend/src/context/PaymentContext";
import NewRole from "./components/Roles/NewRole";
import { AuthProvider } from "../../flexistore-frontend/src/context/AuthContext";
import { CartProvider } from "../../flexistore-frontend/src/context/CartContext";

function App() {
  

  return (

      <div>
    <CartProvider>
    <PaymentProvider>
      <AuthProvider>
    <ServiceProvider>
    <InitialProvider>
      <CrudProvider>
        <BrowserRouter>
          <Menu />
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <SideMenu />
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/newcategory" element={<NewCategory />} />
                <Route path="/newproduct" element={<NewProduct />} />
                <Route path="/newlocker" element={<NewLocker />} />
                <Route path="/newpublicarea" element={<NewPublicArea/>} />
                <Route path="/newpaymentmethod" element={<NewPaymentMethod />} />
                <Route path="/newrole" element={<NewRole />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </div>
          <Footer/>
        </BrowserRouter>
      </CrudProvider>
    </InitialProvider>
    </ServiceProvider>
    </AuthProvider>
    </PaymentProvider>
    </CartProvider>
      </div>
  )
}

export default App
