
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { AuthProvider } from "./context/AuthContext";
import Register2 from "./components/Register2";
import Login2 from "./components/Login2";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./components/Profile";








function App() {
  

  return (
   <div>
     

     <AuthProvider>
     <BrowserRouter>
      <Menu/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/register2" element={<Register2/>}/>
        <Route path="/login2" element={<Login2/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Navigate to ="/"/>}/>
      </Routes>
      </BrowserRouter>
      </AuthProvider>
      <ToastContainer/>
    
   </div>
  )
}

export default App
