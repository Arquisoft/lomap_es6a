import React, { useState, useEffect } from 'react';
import { getSolidDataset, getThing, getStringNoLocale, getUrlAll } from '@inrupt/solid-client';
import { FOAF } from '@inrupt/vocab-common-rdf';
import { useSession } from '@inrupt/solid-ui-react';

function BuscarAmigo() {
  const { session } = useSession();
  const [webId, setWebId] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const [amigos, setAmigos] = useState<string[]>([]);

  async function buscarAmigo() {
    try {
      setCargando(true);
      if (!webId) {
        throw new Error('WebID no especificado');
      }
      const dataset = await getSolidDataset(webId);
      const perfil = getThing(dataset, webId);
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
        throw new Error('WebID no especificado');
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

  return (
    <div>
      <h1>Buscar Perfil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          WebID:
          <input type="text" value={webId} onChange={(event) => setWebId(event.target.value)} />
        </label>
        <button type="submit">Buscar</button>
      </form>
      {cargando && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {nombre && <p>Nombre: {nombre}</p>}
      <h2>Mis Amigos:</h2>
      {amigos.length > 0 ? (
        <ul>
          {amigos.map((amigo) => (
            <li key={amigo}>{amigo}</li>
          ))}
        </ul>
      ) : (
        <p>No tienes amigos aún.</p>
      )}
    </div>
  );
}

export default BuscarAmigo;
