import { createContext, useEffect, useState } from 'react';
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

/*     useEffect(() => {
        if(user.isadmin>70){
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
        }else{
            toast.error('Access Denied')
        }
    }, [refresh,user]); */


/*     const deleteUser = async (id) => {
        try {
            const token = sessionStorage.getItem('usertoken');
            const keres = await fetch(`${import.meta.env.VITE_BASE_URL}/user/delete`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                 //'user_id': id
                 },
                 body: JSON.stringify({ id })
            });

            const valasz = await keres.json();

            console.log("LÁTOD? UTF8",valasz); 

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
 */

    const deleteUser = async (id) => {
        try {
            // 1. console log a token ellenőrzésére
            const token = sessionStorage.getItem('usertoken');
            console.log("Token: ", token); // Ellenőrizd, hogy valóban van-e token
    
            // 2. Ellenőrizd, hogy az id is jól van-e átadva
            console.log("Törölni kívánt felhasználó ID: ", id); // Ellenőrizd, hogy az id helyes
    
            const keres = await fetch(`${import.meta.env.VITE_BASE_URL}/user/delete`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Authorization': `Bearer ${token}`,
                    'userId': id // Az id-t küldjük a törléshez
                },
                //body: JSON.stringify({ id }) // Az id-t küldjük a törléshez
            });
    
            // 3. console log, hogy lássuk, mit válaszol a backend
            console.log("Backend válasz: ", keres);
    
            const valasz = await keres.json();
    
            // 4. console log, hogy mi van a válaszban
            console.log("Backend JSON válasz: ", valasz); 
    
            if (keres.ok) {
                toast.success('Felhasználó törölve!');
            } else {
                toast.error(valasz.error || 'Valami hiba történt!');
            }
    
            update();
    
        } catch (error) {
            console.log("Hiba történt a törlésnél: ", error); // További hibák nyomon követése
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