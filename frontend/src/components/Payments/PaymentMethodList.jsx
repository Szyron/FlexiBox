import { useContext } from 'react'
import PaymentMethodCard from "./PaymentMethodCard"
import PaymentContext from '../../context/PaymentContext'


function PaymentMethodList() {
  const { payments } = useContext(PaymentContext);
  return (
    <div className="bg-base-200 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-primary">Fizetési módok listája</h1>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {
          payments.map((payment) => (<PaymentMethodCard key={payment.id} payment={payment} />))
        }
      </div>
    </div>
  )
}

export default PaymentMethodList;