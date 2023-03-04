import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
        <Link to={'/'}>Home</Link>
        <Link to={'/mapa'}>Mapa</Link>
        <Link to={'/amigos'}>Amigos</Link>
    </nav>
  );
}

export default Nav;