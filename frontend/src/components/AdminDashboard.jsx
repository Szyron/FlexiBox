import React from 'react'


function AdminDashboard() {
    const user=JSON.parse(sessionStorage.getItem('user'));
    if(user.isadmin<70){
        return (
            <div>Access Denied</div>
        )
    }
    
  return (
    <div>
        <h1>AdminDashboard</h1>
        <p>{user.id}</p>
        <p>{user.first_name}</p>
        <p>{user.last_name}</p>
        <p>{user.email}</p>
        <p>{user.isadmin}</p>
       
    </div>
  )
}

export default AdminDashboard