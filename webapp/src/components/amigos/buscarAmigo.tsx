import React, { useState, useEffect} from 'react';
import { getSolidDataset, getThing, getStringNoLocale, getUrlAll} from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import {SessionType} from "../../shared/shareddtypes";
import { Link } from 'react-router-dom';
import '../../hojasEstilo/amigos.css';
import {obtenerUrlDeAmigos,obtenerNombresDeAmigos,delAmigos,encontrarurl} from "../../accesoPods/adaptador";

function BuscarAmigo({ session }: SessionType) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [amigos, setAmigos] = useState<string[]>([]);
  const [name, setName] = useState('');
  const [url,setUrl] = useState('');
  const WebID = "https://" + name + ".inrupt.net/profile/card#me";

  async function buscarAmigo() {
    try {
      setCargando(true);
      setNombre('');
      if (!name) {
        throw new Error('Nombre de usuario no especificado');
      }
      const dataset = await getSolidDataset(WebID);
      const perfil = getThing(dataset, WebID);
      if (!perfil) {
        throw new Error('Perfil no encontrado');
      }
      setNombre(getStringNoLocale(perfil, FOAF.name) ?? '');
      setError(null);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setCargando(false);
    }
  }

  async function encontrarUrl(nombreAmigo : string) : Promise<string> {
    let res = await encontrarurl({session},nombreAmigo);
    return res?res:"";
  }

  useEffect(() => {
    async function cargarAmigos() {
      if (!session.info.isLoggedIn) return;

      const { webId } = session.info;
      if (!webId) {
        throw new Error('Nombre de usuario no especificado');
      }
      const dataset = await getSolidDataset(webId);
      const perfil = getThing(dataset, webId);
      if (!perfil) {
        throw new Error('Perfil no encontrado');
      }
      const amigosUrl = getUrlAll(perfil, FOAF.knows);
      const nuevosAmigos = await Promise.all(amigosUrl.map(async (url) => {
        const amigoDataset = await getSolidDataset(url);
        const amigoPerfil = getThing(amigoDataset, url);
        if (!amigoPerfil) {
          throw new Error('Perfil de amigo no encontrado');
        }
        return getStringNoLocale(amigoPerfil, FOAF.name) ?? url;
      }));
      setAmigos(nuevosAmigos);
    }
    cargarAmigos().catch(error=>{throw new Error(error);});
  }, [session]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    buscarAmigo().catch(error=>{throw new Error(error);});
  }

  async function addFriend() {
    let nodef = undefined;
    let nuevosAmigosUrl;
    nuevosAmigosUrl = await obtenerUrlDeAmigos({session},WebID);
    if (nuevosAmigosUrl !== nodef){
      let nuevosAmigos;
      nuevosAmigos = await obtenerNombresDeAmigos(nuevosAmigosUrl);
      if (nuevosAmigos !== nodef && Array.isArray(nuevosAmigos)) {
        const nuevosAmigosSinRepetidos = nuevosAmigos.filter(amigo => !amigos.includes(amigo));
        if (nuevosAmigosSinRepetidos.length > 0) {
          const amigosAgregados = [...amigos, ...nuevosAmigosSinRepetidos];
          setAmigos(amigosAgregados);
        }
      }
    }
  }

  async function deleteFriend(amigoNombre: string) {
    // Actualizar la lista de amigos
    const nuevosAmigosUrl = await delAmigos({session},amigoNombre);
    if (nuevosAmigosUrl !== undefined){const nuevosAmigos = await obtenerNombresDeAmigos(nuevosAmigosUrl);if (nuevosAmigos !== undefined){setAmigos(nuevosAmigos);}}
  }
  
  return (
    <div className='contenedor-amigos'>
      <div className='buscar-amigo'>
        <h2 className='titulos'>Buscar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label className='titulos'>
            Nombre de usuario:
            <input aria-label='username' type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <button type="submit" aria-label="searchButton">Buscar </button>
        </form>
        {cargando && <p style={{ color: 'white' }}>Cargando...</p>}
        {error && <p className='titulos'>{error}</p>}
        {nombre && <p className='pconañadir'>Nombre: {nombre} <button type='submit' aria-label="addButton" onClick={addFriend}>Añadir</button></p>}
      </div>
      <div className='mis-amigos'>
        <h2 className='titulos'>Mis Amigos:</h2>
        <div className='amigos'>
          {amigos.length > 0 ? (
            <div>
              {amigos.map((amigo) => (
                <div className='amigo' key={amigo}>
                  <p>{amigo}</p>
                  <Link aria-label="mapaLink" to={url} onClick={async (event) => {const string = await encontrarUrl(amigo);setUrl("/mapaAmigo/" + string);}}>Mapa</Link>
                  <button type='submit' aria-label="deleteButton" onClick={() => deleteFriend(amigo)}>Eliminar</button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'white' }}>No tienes amigos aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuscarAmigo;