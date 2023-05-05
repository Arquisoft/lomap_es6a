import { Link } from "react-router-dom";
import '../../hojasEstilo/Navegacion.css';
import logo from '../../imagenes/icono.png'
import { useSession } from '@inrupt/solid-ui-react';
import { getDefaultSession} from '@inrupt/solid-client-authn-browser';

interface NavSes {
  session?: any;
}

function Nav({session = getDefaultSession()}: NavSes) {

   const tmp = useSession().session
   if(!session)
     session = tmp;

  return (
    <nav className="navbar">
        <Link to='/lomap_6a_despliegue/'>
          <img className="imagen" src={logo} alt='logo'></img>
        </Link>
        <ul className="list">
          {(!session.info.isLoggedIn) ?
            <div className="nav_sin_login">
              <li className="item" aria-label='nav-Home'>
                <Link to={'/lomap_6a_despliegue/'}>Home</Link>
              </li>
              <li className="item" aria-label='nav-Login'>
                <Link to={'/lomap_6a_despliegue/Login'}>Login</Link>
              </li>
            </div>
            :
            <div className="nav_con_login">
              <li className="item" aria-label='nav-Home'>
                <Link to={'/lomap_6a_despliegue/'}>Home</Link>
              </li>
              <li className="item" aria-label='nav-Mapa'>
                <Link to={'/lomap_6a_despliegue/mapa'}>Mapa</Link>
              </li>
              <li className="item" aria-label='nav-Amigos'>
                <Link to={'/lomap_6a_despliegue/amigos'}>Amigos</Link>
              </li>
              <li className="item" aria-label='nav-AboutUs'>
                <Link to={'/lomap_6a_despliegue/aboutus'}>About us</Link>
              </li>
              <li className="item" aria-label='nav-Login'>
                <Link to={'/lomap_6a_despliegue/Login'}>Login</Link>
              </li>
            </div>
            }
        </ul>
    </nav>
  );
}

export default Nav;