import { Link } from "react-router-dom";
import '../../hojasEstilo/Navegacion.css';
import logo from '../../imagenes/logo192.png'
import { useSession } from '@inrupt/solid-ui-react';
function Nav() {
  const {session} = useSession();

  return (
    <nav className="navbar">
        <Link to='/'>
          <img className="imagen" src={logo} alt='logo'></img>
        </Link>
        <ul className="list">
          {(!session.info.isLoggedIn) ?
            <div className="nav_sin_login">
              <li className="item" aria-label='nav-Home'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className="item" aria-label='nav-Login'>
                <Link to={'/Login'}>Login</Link>
              </li>
            </div>
            :
            <div className="nav_con_login">
              <li className="item" aria-label='nav-Home'>
                <Link to={'/'}>Home</Link>
              </li>
              <li className="item" aria-label='nav-Mapa'>
                <Link to={'/mapa'}>Mapa</Link>
              </li>
              <li className="item" aria-label='nav-Amigos'>
                <Link to={'/amigos'}>Amigos</Link>
              </li>
              <li className="item" aria-label='nav-AboutUs'>
                <Link to={'/aboutus'}>About us</Link>
              </li>
              <li className="item" aria-label='nav-Login'>
                <Link to={'/Login'}>Login</Link>
              </li>
            </div>
            }
        </ul>
    </nav>
  );
}

export default Nav;