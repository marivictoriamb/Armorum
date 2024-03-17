import styles from "./Error.module.css"

export default function Error(left){
    return(
        <div className={styles.Error} style={{right:"1.5vw"}}>
            <img style={{width:"35px", height:"30px"}} src="/error.png"/>
            <span className={styles.msg}> Datos erroneos </span>
        </div>
    )
}