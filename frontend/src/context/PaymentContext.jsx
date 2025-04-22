import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import secureStorage from '../utils/secureStorage';


const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {

    const [refresh, setRefresh] = useState(false);
    const [payments, setPayments] = useState([]);
    const token = sessionStorage.getItem('usertoken');
    const user = secureStorage.getItem('user');

    const update = () => {
        setRefresh(prev => !prev);
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/payment`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(adat => {
                setPayments(adat.paymentMethods)
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
        <PaymentContext.Provider value={{
            backendMuvelet,
            update,
            refresh,
            payments,
            setPayments
        }}>{children}
        </PaymentContext.Provider>
    )
}

export default PaymentContext;