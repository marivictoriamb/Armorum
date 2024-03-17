import { useEffect, useState } from 'react';
import { useUser } from '../hooks/user';
import styles from './ClubCard.module.css'

function GameCard({member}){   
    const user = useUser();
   
    return(
        
        <div className={styles.All}>
        <div className={styles.Card}>
            <div className={styles.bannerG}>
                <div className={styles.Controler}>
                    <div className={styles.Image}>
                        <img style={{width: "20vh", height:"20vh"}} alt="control" src="/controller.png" />
                    </div>
                </div>
            </div>
            
            <div className={styles.menu}>
                <h2 className={styles.Name}>{member}</h2>
            </div>
        </div>
    </div>
    )
}
export default GameCard;
