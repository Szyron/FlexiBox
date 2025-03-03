import { use, useContext } from 'react';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from './AuthContext';



const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [areas, setAreas] = useState([]);
    const [address, setAddress] = useState([]);
    const token = localStorage.getItem('userToken');
    //const {user} = useContext(AuthContext);
    const user = JSON.parse(localStorage.getItem('user'));



    const update = () => {
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        // Ellenőrizzük, hogy a felhasználó létezik-e
        if (user && user.id) {
            fetch(`${import.meta.env.VITE_BASE_URL}/address/${user.id}`, { // user.id az, amit a backendhez küldünk
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // JWT token a fejléchez
                }
            })
                .then(res => res.json())
                .then(data => {
                    setAddress(data.addresses); // Címek beállítása
                    console.log('Address', data.addresses); // Debug log
                })
                .catch(err => {
                    toast.error('Hiba történt a címek lekérésekor!');
                    console.error(err); // Hiba logolás
                });
        }
    }, [refresh, user]); // Csak akkor frissítjük, ha a felhasználó változik, vagy a frissítés kérése megtörtént


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/publicareaname`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(adat => {
                setAreas(adat.publicAreas)
            })
            .catch(err => alert(err));
    }, [refresh]);

    const backendMuvelet = async (data, method, url, header) => {
        try {
            const keres = await fetch(url, {
                method: method,
                headers: header,
                body: JSON.stringify(data),
                //body:data
            });

            const valasz = await keres.json();

            if (keres.ok) {
                toast.success('Sikeres adatfelvitel!');
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
        <AddressContext.Provider value={{ 
            areas,
            address,
            backendMuvelet,
            update,
            setAddress

            }}>{children}
        </AddressContext.Provider>
    )
}

export default AddressContext;