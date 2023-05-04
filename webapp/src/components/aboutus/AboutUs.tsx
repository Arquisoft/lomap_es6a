import React from 'react';
import '../../hojasEstilo/AboutUs.css';
import logojavi from '../../imagenes/fotopjavi.png';
import logoruben from '../../imagenes/fotopruben.png';
import logoalonso from '../../imagenes/fotopalonso.png';
import logopablo from '../../imagenes/fotoppablo.png';
import logosergio from '../../imagenes/fotopsergio.png';
import {Navigate } from 'react-router-dom';
import {SessionType} from "../../shared/shareddtypes";

function AboutUs({ session }: SessionType) {
  if (!session.info.isLoggedIn){
    return <Navigate to="/login" replace />;
  }

  const teamMembers = [
    {
        name: 'Javier Novella',
        role: 'Developer',
        description: 'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y saxofonista profesional del conservatorio de Oviedo',
        photo: logojavi
    },
    {
        name: 'Rubén Díaz',
        role: 'Developer',
        description: 'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica',
        photo: logoruben
    },
    {
        name: 'Alonso Antuña',
        role: 'Developer',
        description: 'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica',
        photo: logoalonso
    },
    {
        name: 'Pablo Fernández',
        role: 'Developer',
        description: 'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica',
        photo: logopablo
    },
    {
        name: 'Sergio Moro',
        role: 'Developer',
        description: 'Desarrollador junior de la Universidad de Oviedo, estudiante del grado de Informatica de Software y estudiante prodigio en la computación cuántica',
        photo: logosergio
    }
  ];

  return (
    <div className="about-us">
      <h2 style={{ color: 'white' }}>About Us</h2>
      <div className="team-members">
        {teamMembers.map(member => (
          <div className="member" key={member.name}>
            <img src={member.photo} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <p>{member.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;