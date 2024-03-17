import styles from "./CardLoader.module.css"

export default function CardLoader(){
    return (
        <div className={styles.card}>
            <div className={styles.cardImg} id={styles.loading}></div>
            <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle} id={styles.loading}> </h2>
                <p className={styles.cardDesc} id={styles.loading}> </p>
            </div>
        </div>
    )
}