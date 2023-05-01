import React, { useState, useEffect} from 'react';
import { getSolidDataset, getThing, getStringNoLocale, getUrlAll, addIri, setThing, saveSolidDatasetAt, removeIri} from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import {SessionType} from "../../shared/shareddtypes";
import { Link } from 'react-router-dom';
import '../../hojasEstilo/amigos.css';

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
      if (!WebID) {
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
      } else {
        setError('Ha ocurrido un error desconocido');
      }
    } finally {
      setCargando(false);
    }
  }

  async function encontrarUrl(nombreAmigo : string) : Promise<string> {
    const { webId } = session.info;
  
    if (!webId) {
      throw new Error('Nombre de usuario no especificado');
    }
  
    const profileDataset = await getSolidDataset(webId);
  
    if (!profileDataset) {
      throw new Error('Perfil no encontrado');
    }
  
    const profileThing = getThing(profileDataset, webId);
  
    if (!profileThing) {
      throw new Error('Perfil no encontrado');
    }
  
    const amigosUrl = getUrlAll(profileThing, FOAF.knows);
  
    let amigoUrl: string ="";
    for (const url of amigosUrl) {
      const amigoDataset = await getSolidDataset(url);
  
      if (!amigoDataset) {
        throw new Error(`No se pudo cargar el perfil del amigo en ${url}`);
      }
  
      const amigoPerfil = getThing(amigoDataset, url);
  
      if (!amigoPerfil) {
        throw new Error(`No se pudo encontrar la cosa del amigo en ${url}`);
      }
  
      const amigoNombreActual = getStringNoLocale(amigoPerfil, FOAF.name);
      if (amigoNombreActual === nombreAmigo) {
        amigoUrl = url.split("/").slice(2,3).join().split(".").slice(0,1).join();
        break;
      }
    }
  
    return amigoUrl;
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
    cargarAmigos();
  }, [session]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    buscarAmigo();
  }

  async function addFriend() {
    const { webId } = session.info;

    if(webId == null) {
      throw new Error();
    }
    const profileDataset = await getSolidDataset(webId);

    if(profileDataset == null) {
      throw new Error();
    }
    const thing = getThing(profileDataset, webId);

    if(thing == null) {
      throw new Error();
    }
    const updatedThing = addIri(thing, FOAF.knows, WebID);
    const updatedProfileDataset = setThing(profileDataset, updatedThing);
    await saveSolidDatasetAt(webId, updatedProfileDataset, {
        fetch: session.fetch,
    });

    const nuevosAmigosUrl = getUrlAll(updatedThing, FOAF.knows);
    const nuevosAmigos = await Promise.all(nuevosAmigosUrl.map(async (url) => {
      const amigoDataset = await getSolidDataset(url);
      const amigoPerfil = getThing(amigoDataset, url);
  
      if (!amigoPerfil) {
        throw new Error(`No se pudo encontrar la cosa del amigo en ${url}`);
      }
  
      return getStringNoLocale(amigoPerfil, FOAF.name) ?? url;
    }));
  
    setAmigos(nuevosAmigos);
  }

  async function deleteFriend(amigoNombre: string) {
    const { webId } = session.info;
  
    if (!webId) {
      throw new Error('Nombre de usuario no especificado');
    }
  
    const profileDataset = await getSolidDataset(webId);
  
    if (!profileDataset) {
      throw new Error('Perfil no encontrado');
    }
  
    const profileThing = getThing(profileDataset, webId);
  
    if (!profileThing) {
      throw new Error('Perfil no encontrado');
    }
  
    const amigosUrl = getUrlAll(profileThing, FOAF.knows);
  
    // Buscar la URL del amigo correspondiente a partir de su nombre
    let amigoUrl: string | undefined;
    for (const url of amigosUrl) {
      const amigoDataset = await getSolidDataset(url);
  
      if (!amigoDataset) {
        throw new Error(`No se pudo cargar el perfil del amigo en ${url}`);
      }
  
      const amigoPerfil = getThing(amigoDataset, url);
  
      if (!amigoPerfil) {
        throw new Error(`No se pudo encontrar la cosa del amigo en ${url}`);
      }
  
      const amigoNombreActual = getStringNoLocale(amigoPerfil, FOAF.name);
      if (amigoNombreActual === amigoNombre) {
        amigoUrl = url;
        break;
      }
    }
  
    if (!amigoUrl) {
      throw new Error(`No se pudo encontrar el amigo con el nombre ${amigoNombre}`);
    }
  
    const updatedThing = removeIri(profileThing, FOAF.knows, amigoUrl);
    const updatedProfileDataset = setThing(profileDataset, updatedThing);
    await saveSolidDatasetAt(webId, updatedProfileDataset, {
      fetch: session.fetch,
    });
  
    // Actualizar la lista de amigos
    const nuevosAmigosUrl = getUrlAll(updatedThing, FOAF.knows);
    const nuevosAmigos = await Promise.all(nuevosAmigosUrl.map(async (url) => {
      const amigoDataset = await getSolidDataset(url);
      const amigoPerfil = getThing(amigoDataset, url);
  
      if (!amigoPerfil) {
        throw new Error(`No se pudo encontrar la cosa del amigo en ${url}`);
      }
  
      return getStringNoLocale(amigoPerfil, FOAF.name) ?? url;
    }));
  
    setAmigos(nuevosAmigos);
  }
  
  return (
    <div className='contenedor-amigos'>
      <div className='buscar-amigo'>
        <h2>Buscar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre de usuario:
            <input aria-label='username' type="text" value={name} onChange={(event) => setName(event.target.value)} />
          </label>
          <button type="submit" aria-label="searchButton">Buscar </button>
        </form>
        {cargando && <p>Cargando...</p>}
        {error && <p>{error}</p>}
        {nombre && <p className='pconañadir'>Nombre: {nombre} <button type='submit' aria-label="addButton" onClick={addFriend}>Añadir</button></p>}
      </div>
      <div className='mis-amigos'>
        <h2>Mis Amigos:</h2>
        <div className='amigos'>
          {amigos.length > 0 ? (
            <div>
              {amigos.map((amigo) => (
                <div className='amigo' key={amigo}>
                  <p>{amigo}</p>
                  <Link aria-label="mapaLink" to={url} onClick={(event) => encontrarUrl(amigo).then( string =>{setUrl( "/mapaAmigo/"+string)} )}>Mapa</Link>
                  <button type='submit' aria-label="deleteButton" onClick={() => deleteFriend(amigo)}>Eliminar</button>
                </div>
              ))}
            </div>
          ) : (
            <p>No tienes amigos aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BuscarAmigo;