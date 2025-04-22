import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const CrudContext = createContext();

export const CrudProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);
    const [areas, setAreas] = useState([]);

    const update = () => {
        setRefresh((prev) => !prev);
    };

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

    const backendMuvelet = async (data, method, url, header, successMessage, errorMessage) => {
        try {
            const keres = await fetch(url, {
                method: method,
                headers: header,
                body: JSON.stringify(data),
            });
            const valasz = await keres.json();

            if (keres.ok) {
                toast.success(successMessage || "Sikeres művelet!");
            } else {
                toast.error(valasz.error || errorMessage || "Valami hiba történt!");
            }

            update();
        } catch (error) {
            toast.error(errorMessage || "Hálózati hiba történt!");
            console.error(error);
        }
    };

    const backendMuveletFile = async (data, method, url, headers) => {
        try {
            const response = await axios({
                method: method,
                url: url,
                data: data,
                headers: headers,
            });

            toast.success("Sikeres adatfelvitel!");
            update();
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.error || "Valami hiba történt!");
            console.error(error);
            throw error;
        }
    };

    const fetchData = async (url, setState, successMessage, errorMessage) => {
        try {
            const data = await backendMuvelet(
                null,
                "GET",
                url,
                { Authorization: `Bearer ${sessionStorage.getItem("usertoken")}` },
                successMessage,
                errorMessage
            );
            setState(data);
        } catch (error) {
            console.error("Hiba történt az adatok betöltésekor:", error);
        }
    };

    const deleteItem = async (url, headers, successMessage, errorMessage) => {
        try {
            await backendMuvelet(
                null,
                "DELETE",
                url,
                headers,
                successMessage,
                errorMessage
            );
        } catch (error) {
            console.error("Hiba történt a törlés során:", error);
        }
    };

    return (
        <CrudContext.Provider
            value={{
                refresh,
                update,
                backendMuvelet,
                backendMuveletFile,
                fetchData,
                deleteItem,
                setRefresh,
                areas,
            }}
        >
            {children}
        </CrudContext.Provider>
    );
};

export default CrudContext;