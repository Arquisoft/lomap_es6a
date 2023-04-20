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

export function guardarComentario(session: Session, texto: string, idmarker: string, autor: string, valoracion: string, user: string): Comentario | null {
    let comentario = new Comentario(texto, idmarker, autor, valoracion);

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
        comentariosUrl = basicUrl.concat("/public", "/comentarios","/"+idmarker, "/" + comentario.id + ".json");
    }

    let blob = new Blob([JSON.stringify(comentario)], { type: "application/json" });
    let file = new File([blob], comentario.id + ".json", { type: "application/json" });

    escribir(session, comentariosUrl, file).then(result => {
        if (result) {
            console.log("Comentario " + comentario.id + " saved correctly in " + comentariosUrl);
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