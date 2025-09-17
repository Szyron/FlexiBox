import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import AdminContext from '../../context/AdminContext';
import RegistrationDataEdit from './RegistrationDataEdit';


function AdminDashboardCard({ user }) {
  const { deleteUser } = useContext(AdminContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const registrationDataEdit = () => {
    navigate('/registrationdataedit', { state: { user } });

  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const openModal = () => {
    setIsModalOpen(true);
  }

  return (
    <>
      <tr>
        <th>{user.id}</th>
        <td>{user.last_name}</td>
        <td>{user.first_name}</td>
        <td>{user.email}</td>
        <td>{user.role.warrant_name}</td>
        <td>{new Date(user.created_at).toISOString().split('T')[0]} {new Date(user.created_at).toISOString().split('T')[1].slice(0, 8)}</td>
        <td><button onClick={() => openModal()} className='btn bg-primary text-white'>
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon">
            <path d="M3.29,14.69l1.4-1.4a1,1,0,0,1,1.4,0L11,18.2V21H8.2L3.29,16.09A1,1,0,0,1,3.29,14.69Z" stroke="#2ca9bc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            <path d="M7,9.27A5.77,5.77,0,0,1,7.08,8,6,6,0,0,1,19,9a5.94,5.94,0,0,1-1.34,3.77,1,1,0,0,0,.28,1.45A7,7,0,0,1,21,20a1,1,0,0,1-1,1H15" stroke="#005c6a" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
          </svg>
          Szerkesztés</button></td>
        <td><button onClick={() => deleteUser(user.id)} className='btn bg-info text-white'>
          <svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 icon line-color">
            <g id="SVGRepo_iconCarrier">
              <line x1="6" y1="15" x2="3" y2="18" stroke="#2ca9bc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <line x1="3" y1="15" x2="6" y2="18" stroke="#2ca9bc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
              <path d="M10,21H20a1,1,0,0,0,1-1,7,7,0,0,0-3.06-5.78,1,1,0,0,1-.28-1.45A5.94,5.94,0,0,0,19,9,6,6,0,0,0,7.08,8a5.9,5.9,0,0,0,.27,3" stroke="#50c6c9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
            </g>
          </svg>
          Törlés</button></td>
        {isModalOpen && (

          <RegistrationDataEdit user={user} closeFunction={() => closeModal()} />

        )}
      </tr>
    </>
  )
}

export default AdminDashboardCard