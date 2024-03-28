import {useEffect, useState} from "react";
import { getImageUrl } from "../controllers/files";

export async function useImageUrl(path){
    const  [url, setUrl] = useState(null);

    useEffect(() => {
        const load = async () => {
            const url = await getImageUrl(path);
            setUrl(url);
        };
        load();
    },[path]); 
    
    return url;
}