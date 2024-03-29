import { useNavigate } from "react-router-dom";
import styles from './AgrupCard.module.css'

export default function AgrupCard({name, description, category}){    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/agrupaciones/${name}`);
      };


    return(
        <div className={styles.All} >
            <div className={styles.Card}>
                <div className={styles.banner}>
                    <div className={styles.Image} onClick={handleClick} style={{cursor:"pointer"}}>
                        <img style={{margin:"auto", width: "300px", height:"50%", borderRadius:"100%", objectFit:"cover"}} alt="control" src="/panda.png"/>
                    </div>
                </div>
                <div className={styles.Agrupaciones} >
                    <h1 className={styles.Name}>{name}</h1>
                    <div style={{borderRadius:"50px", backgroundColor:"rgb(255, 145, 0)", width:"80px", textAlign:"center"}}><img onClick={handleClick}src="https://cdn-icons-png.flaticon.com/512/6324/6324826.png" style={{cursor:"pointer", width: "2rem", height: "2rem"}}/></div>
                </div>
            </div>
        </div>
    )
}