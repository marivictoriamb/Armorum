import styles from "./Exit.module.css"

export default function ExitC(){
    return(
        <div className={styles.Error} style={{left:"1.5vw"}}>
            <img style={{width:"35px", height:"25px"}} src="/check.webp"/>
            <span className={styles.msg}>Contribucion Realizada !</span>
        </div>
    )
}