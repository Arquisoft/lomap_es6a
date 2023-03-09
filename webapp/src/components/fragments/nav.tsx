import { Link } from "react-router-dom";
import '../../hojasEstilo/Navegacion.css';
import logo from '../../imagenes/logo192.png'

function Nav() {
  return (
    <nav className="navbar">
        <Link to='/'>
          <img className="imagen" src={logo} alt='logo'></img>
        </Link>
        <ul className="list">
          <li className="item">
            <Link to={'/'}>Home</Link>
          </li>
          <li className="item">
          <Link to={'/mapa'}>Mapa</Link>
          </li>
          <li className="item">
            <Link to={'/amigos'}>Amigos</Link>
          </li>
          <li className="item">
            <Link to={'/aboutus'}>About us</Link>
          </li>
          <li className="item">
            <Link to={'/LoginUsrPsswd'}>Login</Link>
          </li>
        </ul>
    </nav>
  );
}

export default Nav;