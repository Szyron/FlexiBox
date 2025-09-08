import React from 'react'
import { Link } from "react-router-dom";

function SideMenu() {
    return (
            <div className="w-72 min-h-screen bg-accent shadow-md flex flex-col">
                            <div className="flex items-center border-b border-primary border-4">
            </div>
                <ul className="menu bg-accent w-full flex-1 text-primary text-xl font-bold">
                    <li><a>Felhasználókezelő</a></li>
                    <li>
                        <details open>
                            <summary>Új adatok felvitele</summary>
                            <ul>
                                <li><Link to="/newcategory">Új kategória</Link></li>
                                <li><Link to="/newproduct">Új termék</Link></li>
                                <li><Link to="/newlocker">Új csomagautomata</Link></li>
                                <li><Link to="/newpublicarea">Új közterület</Link></li>
                                <li><Link to="/newpaymentmethod">Új fizetési mód</Link></li>
                                <li><Link to="/newrole">Új jogosultság</Link></li>
                            </ul>
                        </details>
                    </li>
                    <li>
                        <details open>
                            <summary>Alapadatok</summary>
                            <ul>
                                <li><a>Jogosultságok</a></li>
                                <li><a>Kategóriák</a></li>
                                <li><a>Orderek</a></li>
                                <li><a>Közterületek</a></li>
                                <li><a>Fizetési módok</a></li>
                            </ul>
                        </details>
                    </li>
                </ul>
            </div>
    )
}

export default SideMenu