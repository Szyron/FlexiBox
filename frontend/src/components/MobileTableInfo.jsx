import { useState } from 'react'
import { Link } from 'react-router-dom';
import FooterInfoUse from "./Term/FooterInfoUse";
import FooterPrivacyInfo from "./Term/FooterPrivacyInfo";

function MobileTableInfo() {
    const [isTermInfo, setTermInfo] = useState(false);
    const [isPolicyInfo, setPolicyInfo] = useState(false);

    const openTermInfo = () => {
        setTermInfo(true);
    };

    const openPolicyInfo = () => {
        setPolicyInfo(true);
    }

    const closeInfo = () => {
        setTermInfo(false);
    };

    const closePolicy = () => {
        setPolicyInfo(false);
    };
    return (
<div className="bg-base-200 pt-96 pb-60 flex flex-col gap-6 items-center text-center md:text-left md:items-start">
  {isTermInfo && (
    <FooterInfoUse closeFunction={closeInfo} />
  )}
  {isPolicyInfo && (
    <FooterPrivacyInfo closeFunction={closePolicy} />
  )}

  {/* Jogi info linkek */}
  <div className="space-y-2">
    <h3 className="text-secondary text-lg font-semibold">Jogi információk</h3>
    <ul>
    <li><button className="text-info underline hover:text-info-content transition" onClick={openTermInfo}>
      Felhasználási feltételek
    </button></li>
    <li><button className="text-info underline hover:text-info-content transition" onClick={openPolicyInfo}>
      Adatvédelmi irányelvek
    </button></li>
    </ul>
  </div>

  {/* Brand info és logo */}
  <div className="flex items-center gap-4 mt-24">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.3873 7.1575L11.9999 12L3.60913 7.14978" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12V21" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 2.57735C11.6188 2.22008 12.3812 2.22008 13 2.57735L19.6603 6.42265C20.2791 6.77992 20.6603 7.44017 20.6603 8.1547V15.8453C20.6603 16.5598 20.2791 17.2201 19.6603 17.5774L13 21.4226C12.3812 21.7799 11.6188 21.7799 11 21.4226L4.33975 17.5774C3.72094 17.2201 3.33975 16.5598 3.33975 15.8453V8.1547C3.33975 7.44017 3.72094 6.77992 4.33975 6.42265L11 2.57735Z" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.5 4.5L16 9" stroke="#50c6c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <div className="text-primary font-bold">
      <p>FlexiStore</p>
      <p className="text-sm text-gray-500">Minden jog fenntartva © 2025</p>
    </div>
  </div>

  {/* Social ikonok */}
  <div className="flex gap-4">
    <a href="#" aria-label="Instagram">
      <svg width="32" height="32" fill="#50c6c9" viewBox="0 0 24 24"><path d="M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z" /></svg>
    </a>
    <a href="#" aria-label="Facebook">
      <svg width="32" height="32" fill="#50c6c9" viewBox="0 0 32 32"><path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z" /></svg>
    </a>
  </div>
</div>

    )
}

export default MobileTableInfo