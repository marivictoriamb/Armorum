import { useNavigate } from "react-router-dom";
import styles from './ClubCard.module.css'
import { useEffect, useState } from "react";
import { getCategoryById, getCategoryByIdName } from "../controllers/categories";
import { useUser } from "../hooks/user";
import { getImageUrl } from "../controllers/files";

function ClubCard({name, description, category, suscrito, photos}){    
    const yes = "/yes.png";
    const nou = "/no.png";
    const si = "Suscrito";
    const no = "No Suscrito";
    const [c, setC] = useState("")
    const navigate = useNavigate();
    const user = useUser();
    const [url, setUrl] = useState("");

    function ask1(){
        if (suscrito == true){
            return yes;
        } else{
            return nou;
        }
    }

    function ask2(){
        if (suscrito == true){
            return si;
        } else{
            return no;
        }
    }

    const handleClick = () => {
        navigate(`/landing/${name}`);
      };

      useEffect(() => {
        async function fetchData() {
            const ca = await getCategoryByIdName(category);
            setC(ca)
            if (photos.length != 0){
                setUrl(await getImageUrl(photos[0]));
              }else{
                setUrl(await getImageUrl(`agrupaciones/noimage.jpeg`));
              }
        };
    
        fetchData();
      }, [user]);



    return(
        <div className={styles.All} >
            <div className={styles.Card}>
                <div className={styles.banner}>
                    <div className={styles.Controler} onClick={handleClick} style={{cursor:"pointer"}}>
                        <div className={styles.Image}>
                        {url != "" ? (
                            <img style={{margin:"auto", width: "250px", height:"200px", borderRadius:"100%", objectFit:"cover"}} alt="control" src={url}/>
                        ):(
                          <img style={{margin:"auto", width: "250px", height:"200px", borderRadius:"100%", objectFit:"cover"}} alt="control" src="/noimage.jpeg"/>
                        )}
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <h2 className={styles.Name}>{name}</h2>
                    <div className={styles.Gender}>{ask2(   )}<img alt="suscrito" src={ask1()} style={{width: "30px", height:"30px"}}/></div>
                    <div className={styles.Description}>{description}</div>
                    <div className={styles.Category}>{c}</div>
                </div>
            </div>
        </div>
    )
}
export default ClubCard;