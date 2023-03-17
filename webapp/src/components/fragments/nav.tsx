import * as React from 'react';
import { Link } from "react-router-dom";
import '../../hojasEstilo/Navegacion.css';
import logo from '../../imagenes/logo192.png'
import { useSession } from '@inrupt/solid-ui-react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { AccountCircle } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';

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
              <li className="item">
                <Link to={'/'}>Home</Link>
              </li>
              <li className="item">
                <Link to={'/Login'}>Login</Link>
              </li>
            </div>
            :
            <div className="nav_con_login">
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
                <Link to={'/Login'}>Login</Link>
              </li>
            </div>
            }
        </ul>
    </nav>
  );
}

export default Nav;