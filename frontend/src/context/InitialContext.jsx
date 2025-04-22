import { createContext, useEffect, useState } from "react";

const InitialContext = createContext();

export const InitialProvider = ({ children }) => {
    const [areas, setPublicAreas] = useState([]); // Állapot a publicareaname adatokhoz
    const [refreshPublicAreaName, setRefreshPublicAreaName] = useState(false); // Egyedi refresh állapot
    const [ refresh , setRefresh]=useState(false);
    const [ categories , setCategories ] = useState([]);
    const [ products , setProducts ] = useState([]);
    const [ lockers , setLockers ] = useState([]);

    const update =()=>{
        setRefresh(prev=>!prev)
    }



    // PublicAreaName adatok frissítése
    const updatePublicAreaName = () => {
        setRefreshPublicAreaName((prev) => !prev); // Csak a publicareaname frissítése
    };

    // PublicAreaName adatok lekérése
    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/publicareaname`, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setPublicAreas(data.publicAreas || [])) // Adatok beállítása
            .catch((err) => console.error("Hiba történt a közterületek lekérésekor:", err));
    }, [refreshPublicAreaName]); // Csak akkor fut le, ha a refreshPublicAreaName változik

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/category`)
        .then(res=>res.json())
        .then(adat=>setCategories(adat.categories))
        .catch(err=>alert(err));
    },[refresh]);

    useEffect(()=>{ 
        fetch(`${import.meta.env.VITE_BASE_URL}/product`)
        .then(res=>res.json())
        .then(adat=>setProducts(adat.products))
        .catch(err=>alert(err));
    },[refresh]);

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_BASE_URL}/locker`)
        .then(res=>res.json())
        .then(adat=>setLockers(adat.lockers))
        .catch(err=>alert(err));
    },[refresh]);
   



    return (
        <InitialContext.Provider value={{ 
            areas, 
            updatePublicAreaName,
            refreshPublicAreaName,
            setRefreshPublicAreaName,
            refresh,
            setRefresh,
            categories,
            products,
            lockers,
            update

            
            }}>
            {children}
        </InitialContext.Provider>
    );
};

export default InitialContext;