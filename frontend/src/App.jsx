import Menu from './components/Menu';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/Login';
import Logged from './components/Logged';
import LoggedMenu from './components/LoggedMenu';
import Register from './components/Register';
import NewLogin from './components/NewLogin';

function App() {
  

  return (
    <div>
      <BrowserRouter>
      {location.pathname === '/logged' ? <LoggedMenu /> : <Menu />}
        <Routes>
          <Route path="/support" element={<NewLogin />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logged" element={<Logged />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App