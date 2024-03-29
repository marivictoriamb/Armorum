import { useNavigate } from "react-router-dom";
import styles from './AgrupCard.module.css'
import { useEffect, useState } from "react";
import { getImageUrl } from "../controllers/files";
import Loader from "./Loader";

export default function AgrupCard({name, description, photos, category}){    
    const navigate = useNavigate();
    const [url, setUrl] = useState("");

    const handleClick = () => {
        navigate(`/agrupaciones/${name}`);
      };

      useEffect(() => {
        async function fetchData() {
          if (photos.length != 0){
            setUrl(await getImageUrl(photos[0]));
          }else{
            setUrl(await getImageUrl(`agrupaciones/noimage.jpeg`));
          }
        };
    
        fetchData();
      }, []);


    return(
        <div className={styles.All} >
            <div className={styles.Card}>
                <div className={styles.banner}>
                    <div className={styles.Image} onClick={handleClick} style={{cursor:"pointer"}}>
                        {url != "" ? (
                            <img style={{margin:"auto", width: "250px", height:"200px", borderRadius:"100%", objectFit:"cover"}} alt="control" src={url}/>
                        ):(
                          <img style={{margin:"auto", width: "250px", height:"200px", borderRadius:"100%", objectFit:"cover"}} alt="control" src="/noimage.jpeg"/>
                        )}
                        
                    </div>
                </div>
                <div className={styles.Agrupaciones} >
                    <h1 className={styles.Name}>{name}</h1>
                    <div style={{borderRadius:"50px", backgroundColor:"rgb(255, 145, 0)", width:"80px", textAlign:"center", color:"white", fontWeight:"700", padding:"10px", cursor:"pointer"}} onClick={handleClick}>
                      Editar
                      </div>
                </div>
            </div>
        </div>
    )
}