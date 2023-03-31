import { getSolidDataset, overwriteFile, getContainedResourceUrlAll, getFile,deleteFile } from "@inrupt/solid-client";
import {Session} from "@inrupt/solid-client-authn-browser";

async function leer(session: Session, url: string): Promise<File | null> {
    let parts = url.split("/");
    let name = parts[parts.length - 1];
    try {
        let blob = await getFile(
            url,
            { fetch: session.fetch }
        );
        return new File([blob], name, { type: blob.type });
    } catch (error) {
        return null;
    }
    return null;
}

async function escribir(session:Session, url: string, file: File): Promise<boolean> {
    let result = true;
    try {
        await overwriteFile(
            url,
            file,
            { contentType: file.type, fetch: session.fetch }
        );
    } catch (error) {
        result = false;
    }
    return result;
}

async function buscarArchivos(session: Session, url: string): Promise<File[] | null> {
    try {
        let dataset = await getSolidDataset(
            url,
            { fetch: session.fetch }
        );

        let urls = getContainedResourceUrlAll(dataset);
        let files: Array<File> = [];
        for (let i = 0; i < urls.length; i++) {
            let file = await leer(session, urls[i]);
            if (file != null) {
                files.push(file);
            }
        }
        return files;
    } catch (error) {
        return null;
    }
    return null;
}

async function deleteData(session: Session, url: string): Promise<boolean> {
    let result = true;
    if (!existsUrl(session, url)) {
        return false;
    }
    try {
        await deleteFile(
            url,
            { fetch: session.fetch }
        );
    } catch (error) {
        result = false;
    }
    return result;
}

function existsUrl(session: Session, url: string): boolean {
    try {
        getSolidDataset(
            url,
            { fetch: session.fetch }
        );
    } catch (error) {
        return false;
    }
    return true;
}

export {escribir, buscarArchivos, deleteData};