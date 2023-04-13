import Marker from './marker';
import Comentario from './comentario';
import {Session} from "@inrupt/solid-client-authn-browser";
import {escribir, buscarArchivos} from "./acceso";

export function guardarMarcador(session: Session, nombre: String, descripcion:String, lat: number, lng: number, tipo: String): Marker | null {
    let marker = new Marker(nombre, descripcion, lat, lng, tipo);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let markersUrl = basicUrl.concat("/public", "/markers", "/" + marker.id + ".json");

    let blob = new Blob([JSON.stringify(marker)], { type: "application/json" });
    let file = new File([blob], marker.id + ".json", { type: "application/json" });

    escribir(session, markersUrl, file).then(result => {
        if (result) {
            console.log("Marker " + marker.id + " saved correctly in " + markersUrl);
        } else {
            console.log("Marker " + marker.id + " could not be saved correctly");
        }
    });

    return marker;
}

export function guardarComentario(session: Session, texto: string, idmarker: string, autor: string, valoracion: string): Comentario | null {
    let comentario = new Comentario(texto, idmarker, autor, valoracion);

    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let comentarioUrl = basicUrl.concat("/public", "/comentarios","/"+idmarker, "/" + comentario.id + ".json");

    let blob = new Blob([JSON.stringify(comentario)], { type: "application/json" });
    let file = new File([blob], comentario.id + ".json", { type: "application/json" });

    escribir(session, comentarioUrl, file).then(result => {
        if (result) {
            console.log("Comentario " + comentario.id + " saved correctly in " + comentarioUrl);
        } else {
            console.log("Comentario " + comentario.id + " could not be saved correctly");
        }
    });

    return comentario;
}
// export function borrarMarcador(session: Session, lat: number, lng: number): Marker | null {
//     let marker = new Marker(lat, lng);

//     if (session.info.webId == null) {
//         return null;
//     } // Check if the webId is undefined

//     let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
//     let pointsUrl = basicUrl.concat("/public", "/markers", "/" + marker.id + ".json");

//     let blob = new Blob([JSON.stringify(marker)], { type: "application/json" });
//     let file = new File([blob], marker.id + ".json", { type: "application/json" });

//     escribir(session, pointsUrl, file).then(result => {
//         if (result) {
//             console.log("Point " + marker.id + " saved correctly in " + pointsUrl);
//         } else {
//             console.log("Point " + marker.id + " could not be saved correctly");
//         }
//     });

//     return marker;
// }

export async function recuperarMarcador(session: Session): Promise<Marker[] | null>{
    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let pointsUrl = basicUrl.concat("/public", "/markers/");

    let markers: Marker[] = [];
    let files = await buscarArchivos(session, pointsUrl);
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

export async function recuperarComentario(session: Session, idmarker: String): Promise<Comentario[] | null>{
    if (session.info.webId == null) {
        return null;
    } // Check if the webId is undefined

    let basicUrl = session.info.webId?.split("/").slice(0, 3).join("/");
    let pointsUrl = basicUrl.concat("/public", "/comentarios","/"+idmarker+"/");

    let comentarios: Comentario[] = [];
    let files = await buscarArchivos(session, pointsUrl);
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