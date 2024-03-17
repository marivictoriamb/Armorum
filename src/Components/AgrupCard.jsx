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
                    <div className={styles.Controler} onClick={handleClick} style={{cursor:"pointer"}}>
                        <div className={styles.Image}>
                            <img style={{width: "20vh", height:"20vh", objectFit:"contain", borderRadius:"50%"}} alt="control" src="/panda.png" />
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <h2 className={styles.Name}>{name}</h2>
                    <div className={styles.Description}>{description}</div>
                    <div className={styles.Category}>{category}</div>
                </div>
            </div>
        </div>
    )
}
