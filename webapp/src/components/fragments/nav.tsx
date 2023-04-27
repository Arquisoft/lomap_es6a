import { Link } from "react-router-dom";
import '../../hojasEstilo/Navegacion.css';
import logo from '../../imagenes/icono.png'
import { useSession,SessionProvider } from '@inrupt/solid-ui-react';
import {Session, getDefaultSession} from '@inrupt/solid-client-authn-browser';
//import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
import { SessionType } from "../../shared/shareddtypes";
import { SessionInfo } from "@inrupt/solid-ui-react/dist/src/hooks/useSession";
interface test {
  session?: any;
}

function Nav({session = getDefaultSession()}: test) {
  //var {session} = useSession();
   const tmp= useSession().session
   if(!session)
     session = tmp;
  //session.info.isLoggedIn
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