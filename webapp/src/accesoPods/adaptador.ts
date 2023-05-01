import Marker from './marker';
import Comentario from './comentario';
import {Session} from "@inrupt/solid-client-authn-browser";
import {escribir, buscarArchivos} from "./acceso";

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