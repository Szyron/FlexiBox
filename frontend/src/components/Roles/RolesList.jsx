import RoleCard from "./RoleCard"
import AuthContext from "../../context/AuthContext"
import {useContext} from 'react'


function RolesList() {
    const {roles} = useContext(AuthContext);

    console.log(roles);

  return (
    <div className="bg-base-200 min-h-screen">
    <h1 className="text text-3xl font-bold text-center p-10 text-secondary">Jogosultságok listája:</h1>
    <div className="flex flex-row flex-wrap items-center justify-center">
   {
       roles.map((role)=>(<RoleCard key={role.id} role={role}/>))
   }

     </div>

     
 </div>
  )
}

export default RolesList