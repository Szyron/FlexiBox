import React, { useState } from "react";
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';


function TermofUseInfo({ closeFunction }) {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    }

    const openOrder = () => {
        if(isChecked){
            toast.success('A felhasználási feltételeket elfogadtad!');
            closeFunction();          
        } else { 
            toast.error('Kérjük, hogy fogadd el a felhasználási feltételeket!');
            closeFunction();
            
        }
    }


    console.log(isChecked);

    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h1 className="font-bold text-lg">Felhasználási Feltételek – FlexiStore</h1>
          <p className="py-4">
          Hatályos: 2025.04.08.
          <br />
          Üdvözlünk a FlexiStore-nál! A FlexiStore egy olyan szolgáltatás, amely automatákból történő termékbérlést tesz lehetővé. Jelenleg a platform fejlesztési szakaszban van, és a szolgáltatás funkciói még változhatnak.

          <h3>1. Általános rendelkezések</h3>
          A FlexiStore szolgáltatás használatával elfogadod az alábbi felhasználási feltételeket.

          A feltételek ideiglenesek, és a szolgáltatás indulásával frissülhetnek.

          <h3>2. A szolgáltatás célja</h3>
          A FlexiStore célja, hogy automatizált eszközökön keresztül elérhetővé tegye különféle termékek rövid távú bérlését.

          A végleges működéshez fizikai automaták és digitális platform (mobilapp vagy weboldal) szükséges, ezek még fejlesztés alatt állnak.

          <h3>3. Használat és jogosultság</h3>
          A rendszer jelenleg tesztverzióban fut, így tényleges bérlés nem történik.

          A jövőben a szolgáltatás igénybevételéhez regisztráció és személyes adatok megadása szükséges lehet.

          <h3>4. Felelősség kizárása</h3>
          A jelen tesztoldal információi kizárólag tájékoztató jellegűek.

          A FlexiStore nem vállal felelősséget semmilyen kárért, amely a tesztplatform használatából ered.

          <h3>5. Módosítás</h3>
          A feltételeket bármikor módosíthatjuk. A változásokról értesítést teszünk közzé ezen az oldalon.
          </p>
          
          <div className="py-4">
              <label className="cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox" />
                <span className="ml-2">Elfogadom a felhasználási feltételeket.</span>
              </label>
          </div>

          <div className="modal-action">
            {/* Close button */}
            <button className="btn" onClick={closeFunction}>
              Bezárás
            </button>
            <Link to="/checkout" className="btn" onClick={openOrder} >
              Tovább a pénztárhoz
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default TermofUseInfo;