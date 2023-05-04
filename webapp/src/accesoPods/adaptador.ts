import Marker from './marker';
import Comentario from './comentario';
import {Session} from "@inrupt/solid-client-authn-browser";
import {escribir, buscarArchivos} from "./acceso";
import { addIri, getSolidDataset, getStringNoLocale, getThing, getUrlAll, removeIri, saveSolidDatasetAt, setThing } from '@inrupt/solid-client';
import { SessionType } from '../shared/shareddtypes';
import { FOAF } from '@inrupt/vocab-common-rdf';

export function guardarMarcador(session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string,imagen:string): Marker | null {
    let marker = new Marker("",nombre, descripcion, lat, lng, tipo,imagen);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let url = session.info.webId?.split("/").slice(0, 3).join("/");
    let markersUrl = url.concat("/public", "/markers", "/" + marker.id + ".jsonld");

    let markerToSave = JSON.parse(JSON.stringify(marker));
    markerToSave["@context"] = "https://schema.org/";
    markerToSave["@type"] = "Place";

    let blob = new Blob([JSON.stringify(markerToSave)], { type: "application/ld+json" });
    let file = new File([blob], marker.id + ".jsonld", { type: "application/ld+json" });

    escribir(session, markersUrl, file).then(result => {
        if (result) {
            console.log("Marker " + marker.id + " saved correctly in " + markersUrl);
        } else {
            console.log("Marker " + marker.id + " could not be saved correctly");
        }
    });

    return marker;
}
export function guardarMarcadorSinImagen(session: Session, nombre: string, descripcion:string, lat: number, lng: number, tipo: string): Marker | null {
    let marker = new Marker("",nombre, descripcion, lat, lng, tipo);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let markersUrl = basicUrl.concat("/public", "/markers", "/" + marker.id + ".jsonld");

    let markerToSave = JSON.parse(JSON.stringify(marker));
    markerToSave["@context"] = "https://schema.org/";
    markerToSave["@type"] = "Place";

    let blob = new Blob([JSON.stringify(markerToSave)], { type: "application/ld+json" });
    let file = new File([blob], marker.id + ".jsonld", { type: "application/ld+json" });

    escribir(session, markersUrl, file).then(result => {
        if (result) {
            console.log("Marker " + marker.id + " saved correctly in " + markersUrl);
        } else {
            console.log("Marker " + marker.id + " could not be saved correctly");
        }
    });

    return marker;
}

export function guardarComentario(session: Session, texto: string, idmarker: string, autor: string, valoracion: string, user: string): Comentario | null {
    let comentario = new Comentario(texto, idmarker, autor, valoracion);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let comentariosUrl = "";

    

    if (user !== ""){
        let primeraParte = session.info.webId?.split("/").slice(0, 2).join("/");
        let segundaParte = session.info.webId?.split("/").slice(2, 3).join().split(".").slice(1,3).join(".");
        comentariosUrl = primeraParte.concat("/",user,".",segundaParte, "/public", "/comentarios","/"+idmarker+"/"+ comentario.id + ".jsonld");
        console.log(comentariosUrl);
    }else{
        let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
        comentariosUrl = basicUrl.concat("/public", "/comentarios","/"+idmarker, "/" + comentario.id + ".jsonld");
    }

    let comentarioToSave = JSON.parse(JSON.stringify(comentario));
    comentarioToSave["@context"] = "https://schema.org/";
    comentarioToSave["@type"] = "Comentario";

    let blob = new Blob([JSON.stringify(comentarioToSave)], { type: "application/ld+json" });
    let file = new File([blob], comentario.id + ".jsonld", { type: "application/ld+json" });

    escribir(session, comentariosUrl, file).then(result => {
        if (result) {
            console.log("Comentario " + comentario.id + " saved correctly in " + comentariosUrl);
        } else {
            console.log("Comentario " + comentario.id + " could not be saved correctly");
        }
    });

    return comentario;
}

export async function recuperarMarcador(session: Session, user: string): Promise<Marker[] | null>{
    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined
    let markersUrl = "";
    if (user !== ""){
        let primeraParte = session.info.webId?.split("/").slice(0, 2).join("/");
        let segundaParte = session.info.webId?.split("/").slice(2, 3).join().split(".").slice(1,3).join(".");
        markersUrl = primeraParte.concat("/",user,".",segundaParte, "/public", "/markers/");
        console.log(markersUrl);
    }else{
        let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
        console.log(user.concat("."+session.info.webId?.split("/").slice(2, 3).join("/").split(".").slice(1,3).join(".").concat("/public", "/markers/")))
        markersUrl = basicUrl.concat("/public", "/markers/");
        console.log(markersUrl)
    }
    
    

    let markers: Marker[] = [];
    let files = await buscarArchivos(session, markersUrl);
    let file: File;
    if (files != null) {
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            let text = await file.text();
            markers.push(JSON.parse(text));
        }
    }
    return markers;
}

export async function recuperarComentario(session: Session, idmarker: String, user: string): Promise<Comentario[] | null>{
    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let comentariosUrl = "";

    if (user !== ""){
        let primeraParte = session.info.webId?.split("/").slice(0, 2).join("/");
        let segundaParte = session.info.webId?.split("/").slice(2, 3).join().split(".").slice(1,3).join(".");
        comentariosUrl = primeraParte.concat("/",user,".",segundaParte, "/public", "/comentarios","/"+idmarker+"/");
        console.log(comentariosUrl);
    }else{
        let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
        comentariosUrl = basicUrl.concat("/public", "/comentarios","/"+idmarker+"/");
    }

    

    let comentarios: Comentario[] = [];
    let files = await buscarArchivos(session, comentariosUrl);
    let file: File;
    if (files != null) {
        for (let i = 0; i < files.length; i++) {
            file = files[i];
            let text = await file.text();
            comentarios.push(JSON.parse(text));
        }
    }
    return comentarios;
}

export async function obtenerUrlDeAmigos({session}: SessionType, WebID:string): Promise<string[] | undefined>{
    const { webId } = session.info;
    if(!webId) {
        throw new Error('Nombre de usuario no especificado');
      }
      const profileDataset = await getSolidDataset(webId);
  
      if(!profileDataset) {
        throw new Error('Perfil no encontrado');
      }
      const thing = getThing(profileDataset, webId);
  
      if(!thing) {
        throw new Error('Cosa de usuario no encontrada');
      }
      const updatedThing = addIri(thing, FOAF.knows, WebID);
      const updatedProfileDataset = setThing(profileDataset, updatedThing);
      await saveSolidDatasetAt(webId, updatedProfileDataset, {
          fetch: session.fetch,
      });

      return getUrlAll(updatedThing, FOAF.knows);
}

export async function obtenerNombresDeAmigos(nuevosAmigosUrl: string[]):Promise<string[] | undefined> {
    const nombresDeAmigos: string[] = [];
  
    await Promise.all(
      nuevosAmigosUrl.map(async (url) => {
        const amigoDataset = await getSolidDataset(url);
        const amigoPerfil = getThing(amigoDataset, url);
  
        if (!amigoPerfil) {
          throw new Error(`No se pudo encontrar la cosa del amigo en ${url}`);
        }
  
        const nombreDeAmigo = getStringNoLocale(amigoPerfil, FOAF.name) ?? url;
        nombresDeAmigos.push(nombreDeAmigo);
      })
    );
  
    return nombresDeAmigos;
  }

export async function delAmigos({session}: SessionType, amigoNombre:string): Promise<string[] | undefined>{
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

    return getUrlAll(updatedThing, FOAF.knows);
}

export async function encontrarurl({session}: SessionType, nombreAmigo:string): Promise<string | undefined>{
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