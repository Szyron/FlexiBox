import { useContext } from 'react'
import RoleCard from "./RoleCard"
import AuthContext from "../../context/AuthContext"


function RolesList() {
  const { roles } = useContext(AuthContext);

  return (
    <div className="bg-base-200 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">Jogosultságok listája</h1>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {
          roles.map((role) => (<RoleCard key={role.id} role={role} />))
        }
      </div>
    </div>
  )
}

export default RolesList