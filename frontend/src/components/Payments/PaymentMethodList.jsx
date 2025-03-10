import PaymentMethodCard from "./PaymentMethodCard"
import PaymentContext from '../../context/PaymentContext'
import {useContext} from 'react'

function PaymentMethodList() {
    const {payments} = useContext(PaymentContext);
  return (
    <div className="bg-base-200 min-h-screen">
    <h1 className="text text-3xl font-bold text-center p-10 text-secondary">Fizetési módok listája:</h1>
    <div className="flex flex-row flex-wrap items-center justify-center">
   {
       payments.map((payment)=>(<PaymentMethodCard key={payment.id} payment={payment}/>))
   }

     </div>

     
 </div>
  )
}

export default PaymentMethodList;