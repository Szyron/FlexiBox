import {Link} from 'react-router-dom';


function Menu() {
  return (
    <div className="navbar bg-white p-8">
      <div className="flex-1">
        <a className="text-xl"><img className="w-30 h-25 btn btn-ghost btn-blue" src="src/img/Szirony1.png" alt="" />SzSz Renting</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a></a>
            </li>
          <li>
            <Link to="/support">Support</Link>
          </li>
          <li>
            <Link to="/login" className="btn-blue">Log In</Link>
            </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Menu