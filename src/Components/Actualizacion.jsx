import styles from "./Actualizacion.module.css"

export default function Actualizacion(){
    return(
        <div className={styles.Actualizacion} style={{right:"1.5vw"}}>
            <span className={styles.msg}>✅ Actualizacion Completada</span>
        </div>
    )
}