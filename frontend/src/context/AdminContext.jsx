import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import secureStorage from '../utils/secureStorage';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState([]);
    const user = secureStorage.getItem('user');

    const update = () => {
        setRefresh(prev => !prev);
    }

    const deleteUser = async (id) => {
        try {
            const token = sessionStorage.getItem('usertoken');
            const keres = await fetch(`${import.meta.env.VITE_BASE_URL}/user/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`,
                    'userId': id
                },
            });
            const valasz = await keres.json();
            if (keres.ok) {
                toast.success('Felhasználó törölve!');
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
            }
            update();
        } catch (error) {
            console.log("Hiba történt a törlésnél: ", error);
            toast.error('Hálózati hiba történt!');
        }
    }
    const backendMuvelet = async (data, method, url) => {
        try {
            const token = sessionStorage.getItem('usertoken');
            const keres = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'user_id': data.id
                },
                body: JSON.stringify(data)
            });
            const valasz = await keres.json();

            if (keres.ok) {
                toast.success('Felhasználó módosítva!');
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
            }
            update();
        } catch (error) {
            toast.error('Hálózati hiba történt!');
            console.error(error);
        }
    }

    return (
        <AdminContext.Provider value={{
            users,
            update,
            setUsers,
            backendMuvelet,
            deleteUser
        }}>{children}
        </AdminContext.Provider>
    )
}

export default AdminContext