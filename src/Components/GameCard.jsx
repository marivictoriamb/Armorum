import { useEffect, useState } from 'react';
import { useUser } from '../hooks/user';
import styles from './GameCard.module.css'

function GameCard({name, image}){   
    const user = useUser();


   
    return(
        
        <div className={styles.All}>
        <div className={styles.Card}>
            <div className={styles.bannerG}>
                <div className={styles.Controler}>
                    <div className={styles.Image} >
                    <img style={{width: "20vh", height:"20vh", objectFit:"contain"}} alt="control" src={image} />
                    </div>
                </div>
            </div>
            
            <div className={styles.menu}>
                <h2 className={styles.Name}>{name}</h2>
            </div>
        </div>
    </div>
    )
}
export default GameCard;
