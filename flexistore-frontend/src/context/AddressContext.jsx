import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [areas, setAreas] = useState([]);
    const [address, setAddress] = useState([]);
    const token = localStorage.getItem('userToken');
    const user = JSON.parse(localStorage.getItem('user'));

    const update = () => {
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        if (user && user.id) {
            fetch(`${import.meta.env.VITE_BASE_URL}/address/${user.id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                })
                .then(res => res.json())
                .then(data => {
                    setAddress(data.addresses);
                })
                .catch(err => {
                    toast.error('Hiba történt a címek lekérésekor!');
                    console.error(err);
                });
        }
    }, [refresh, user]);

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
            refresh,
            address,
            backendMuvelet,
            update,
            setAddress
        }}>{children}
        </AddressContext.Provider>
    )
}

export default AddressContext;