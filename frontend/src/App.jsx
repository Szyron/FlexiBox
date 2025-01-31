
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Main from "./components/Main";
import Menu from "./components/Menu";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
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
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
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
