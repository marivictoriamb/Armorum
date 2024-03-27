import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../firebase";
import {nanoid} from "nanoid";

export async function uploadImagen(data){
    const carpeta = ref(storage, `imagenes/${nanoid()}`);
    const result = await uploadBytes(carpeta, data);
    return result.metadata.fullPath
}

export async function getImageUrl(path){
    const url = await getDownloadURL(ref(storage, path));
    return url;
}