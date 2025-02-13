import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState([]);

    const update = () => {
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(adat => {
                setUsers(adat);
                //console.log(adat);
            })
            .catch(err => alert(err));
    }, [refresh]);

    const deleteUser = async (id) => {
        try {
            const keres = await fetch(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            const valasz = await keres.json();

            if (keres.ok) {
                toast.success('Felhasználó törölve!');
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
            }

            update();

        } catch (error) {
            toast.error('Hálózati hiba történt!');
            console.error(error);
        }
    }

    const backendMuvelet = async (data, method, url) => {
        try {
            const keres = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
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
            backendMuvelet,
            deleteUser

            }}>{children}
        </AdminContext.Provider>
    )
}

export default AdminContext