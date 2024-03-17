import styles from "./Error.module.css"

export default function ErrorUpdate({error}){
    return(
        <div className={styles.Error} style={{right:"2vw"}}>
            <img style={{width:"35px", height:"30px"}} src="/error.png"/>
            <span className={styles.msg}> {error} </span>
        </div>
    )
}