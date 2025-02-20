import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationDataEdit from './RegistrationDataEdit';
import { useState } from 'react';
import { useContext } from 'react';
import AdminContext from '../../context/AdminContext';



function AdminDashboardCard({user}) {
    const {deleteUser} = useContext(AdminContext);
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
        <td>{new Date(user.created_at).toISOString().split('T')[0]} {new Date(user.created_at).toISOString().split('T')[1].slice(0 , 8)}</td>
        <td><button onClick={() => openModal()} className='btn'>Edit</button></td>
        <td><button onClick={() => deleteUser(user.id)} className='btn'>Delete</button></td>
        {isModalOpen && (
        
        <RegistrationDataEdit user={user} closeFunction={()=>closeModal()} />
     
  )}
      </tr>
      
      
     
     
  
     </>
       
  )
}

export default AdminDashboardCard