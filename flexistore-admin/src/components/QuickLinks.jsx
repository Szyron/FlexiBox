import React from 'react'
import QuickLink from './QuickLink'
import { Link } from 'react-router-dom'
import  { SquaresPlusIcon, ArchiveBoxIcon, TruckIcon, LockClosedIcon,CreditCardIcon, GlobeEuropeAfricaIcon } from '@heroicons/react/24/outline'

function QuickLinks() {
  return (
    <div className="card rounded-lg p-4 sm:p-6 bg-base-100">
      <h3 className="text-lg font-semibold text-info mb-4">Gyors Linkek</h3>
      <div className="space-y-3">
        <QuickLink label="Új kategória" to="/newcategory" icon={<SquaresPlusIcon className="w-6 h-6 text-white" />} />
        <QuickLink label="Új termék" to="/newproduct" icon={<ArchiveBoxIcon className="w-6 h-6 text-white" />} />
        <QuickLink label="Új csomagautomata" to="/newlocker" icon={<TruckIcon className="w-6 h-6 text-white" />} />
        <QuickLink label="Új közterület" to="/newpublicarea" icon={<GlobeEuropeAfricaIcon className="w-6 h-6 text-white" />} />
        <QuickLink label="Új fizetési mód" to="/newpaymentmethod" icon={<CreditCardIcon className="w-6 h-6 text-white" />} />
        <QuickLink label="Új jogosultság" to="/newrole" icon={<LockClosedIcon className="w-6 h-6 text-white" />} />
      </div>
    </div>
  )
}

export default QuickLinks