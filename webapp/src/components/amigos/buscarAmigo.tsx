import React, { useState, useEffect, useRef } from 'react';
import { getSolidDataset, getThing, getStringNoLocale, getUrlAll, addIri, setThing, saveSolidDatasetAt, removeIri } from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { useSession } from '@inrupt/solid-ui-react';

function BuscarAmigo() {
  const { session } = useSession();
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [amigos, setAmigos] = useState<string[]>([]);
  const [name, setName] = useState('');
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
    const storedProfileDataset = await saveSolidDatasetAt(webId, updatedProfileDataset, {
        fetch: session.fetch,
    });
  }

  async function deleteFriend() {

  }

  function showMap() {

  }

  return (
    <div>
      <h1>Buscar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
        Nombre de usuario:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {nombre && <p>Nombre: {nombre} <button type='submit' onClick={addFriend}>Añadir</button></p>}
      <h2>Mis Amigos:</h2>
      {amigos.length > 0 ? (
        <ul>
          {amigos.map((amigo) => (
            <p key={amigo}>
              {amigo} <button type='submit' onClick={showMap}>Mostrar Mapa</button> <button type='submit' onClick={deleteFriend}>Eliminar</button>
            </p>
          ))}
        </ul>
      ) : (
        <p>No tienes amigos aún.</p>
      )}
    </div>
  );
}

export default BuscarAmigo;
