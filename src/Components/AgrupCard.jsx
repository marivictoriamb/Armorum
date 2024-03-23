import { useNavigate } from "react-router-dom";
import styles from './ClubCard.module.css'

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
                        <img style={{margin:"auto", width: "300px", height:"50%", borderRadius:"2rem", objectFit:"contain"}} alt="control" src="/panda.png"/>
                    </div>
                </div>
                <br />
                <div className={styles.menu} >
                    <h1 className={styles.Name}>{name}</h1>
                    <img src="https://cdn-icons-png.flaticon.com/512/6324/6324826.png" style={{cursor:"pointer", width: "3rem", height: "3rem"}}/>
                </div>
            </div>
        </div>
    )
}