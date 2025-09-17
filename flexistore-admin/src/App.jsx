import Menu from "./components/Menu"
import SideMenu from "./components/SideMenu";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NewCategory from "./components/Categories/NewCategory";
import NewProduct from "./components/Products/NewProduct";
import NewLocker from "./components/Lockers/NewLocker";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NewPublicArea from "./components/Address/NewPublicArea"
import NewPaymentMethod from "./components/Payments/NewPaymentMethod";
import NewRole from "./components/Roles/NewRole";
import CategoriesList from "./components/Categories/CategoriesList";
import PublicAreaList from "./components/Address/PublicAreaList";
import PaymentMethlist from "./components/Payments/PaymentMethodList";
import RolesList from "./components/Roles/RolesList";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import LockersList from "./components/Lockers/LockersList";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { CrudProvider } from "./components/context/CrudContext";
import { InitialProvider } from "./components/context/InitialContext";
import { ServiceProvider } from "./components/context/ServiceContext";
import { PaymentProvider } from "./components/context/PaymentContext";
import { AuthProvider } from "./components/context/AuthContext";
import { CartProvider } from "./components/context/CartContext";
import { AdminProvider } from "./components/context/AdminContext";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard"

function App() {


  return (
    <div>
      <CartProvider>
        <PaymentProvider>
          <AdminProvider>
            <AuthProvider>
              <ServiceProvider>
                <InitialProvider>
                  <CrudProvider>
                    <BrowserRouter>
                      <Routes>
                        {/* Nyilvános login oldal */}
                        <Route path="/login" element={<Login />} />

                        {/* Protected útvonalak */}
                        <Route
                          path="/*"
                          element={
                            <ProtectedRoute>
                              <Layout />
                            </ProtectedRoute>
                          }
                        >
                          {/* Outlet-be kerülnek a belső route-ok */}
                          <Route index element={<Dashboard/>} />
                          <Route path="newcategory" element={<NewCategory />} />
                          <Route path="newproduct" element={<NewProduct />} />
                          <Route path="newlocker" element={<NewLocker />} />
                          <Route path="newpublicarea" element={<NewPublicArea />} />
                          <Route path="newpaymentmethod" element={<NewPaymentMethod />} />
                          <Route path="newrole" element={<NewRole />} />
                          <Route path="categories" element={<CategoriesList />} />
                          <Route path="publicareas" element={<PublicAreaList />} />
                          <Route path="paymentmethods" element={<PaymentMethlist />} />
                          <Route path="admindashboard" element={<AdminDashboard />} />
                          <Route path="roles" element={<RolesList />} />
                          <Route path="lockers" element={<LockersList />} />
                          <Route path="*" element={<Navigate to="/" />} />
                        </Route>
                      </Routes>
                      <ToastContainer />
                    </BrowserRouter>  
                  </CrudProvider>
                </InitialProvider>
              </ServiceProvider>
            </AuthProvider>
          </AdminProvider>
        </PaymentProvider>
      </CartProvider>

    </div>
  )
}

export default App
