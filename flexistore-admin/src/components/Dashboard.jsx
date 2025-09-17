import StatCard from "./StatCard";
import RecentOrdersTable from "./RecentOrdersTable";
import WelcomeCard from "./WelcomeCard";
import QuickLinks from "./QuickLinks";
import  { UsersIcon, WalletIcon , ShoppingCartIcon, ArchiveBoxIcon} from '@heroicons/react/24/outline'
import { useState, useContext, useEffect } from "react";
import AdminContext from "./context/AdminContext";
import secureStorage from './Utils/secureStorage';


function Dashboard() {
  const user = secureStorage.getItem('user');
  const { users, setUsers } = useContext(AdminContext);
  const token = sessionStorage.getItem('usertoken');

  const [allUsers, setAllUsers] = useState([]);
  const [allIncomes, setAllIncomes] = useState([]);
  const [allProducts, setAllProducts] = useState([]);


  useEffect(() => {
    if (!user || user.isadmin < 70) {
      toast.error('Hozzáférés megtagadva!');
      navigate('/');
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(adat => {
        setAllUsers(adat);
      })
      .catch(err => alert(err));
  }, []);
  console.log(allUsers)

    useEffect(() => {
    if (!user || user.isadmin < 70) {
      toast.error('Hozzáférés megtagadva!');
      navigate('/');
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/orderslist`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(adat2 => {
        setAllIncomes(adat2);
      })
      .catch(err => alert(err));
  }, []);


    useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/product`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(products => {
        setAllProducts(products);
      })
      .catch(err => alert(err));
  }, []);

  const sum = allIncomes.reduce((acc, item) => acc + parseFloat(item.total), 0);  



    return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      {/* stat kártyák */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Összes bérlések"
          value="12"
/*           change="+5% az előző héthez képest" */
          changeColor="text-success"
          icon={<ShoppingCartIcon className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title="Összes felhasználók"
          value={allUsers.length}
/*           change="+12 új felhasználó ma" */
          changeColor="text-success"
          icon={<UsersIcon className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title="Összes bevétel"
          value={`${sum} Ft`}
/*           change="-2.5% tegnaphoz képest" */
          changeColor="text-error"
          icon={<WalletIcon className="w-6 h-6 text-primary" />}
        />

        <StatCard
          title="Összes termék"
          value={allProducts.products.length+" db"}
          changeColor="text-[var(--text-base-content)]"
          icon={<ArchiveBoxIcon className="w-6 h-6 text-primary" />}
        />
      </div>

      {/* táblázat + üdvözlő kártya */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <RecentOrdersTable />
          <WelcomeCard />
        </div>
        <QuickLinks />
      </div>
    </main>
    )
}

export default Dashboard
