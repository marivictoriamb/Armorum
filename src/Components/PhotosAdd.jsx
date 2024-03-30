import styles from './PhotosAdd.module.css'

export default function PhotosAdd(props){
    return(
        <div className={styles.card}>
            <div className={styles.top}>
            <span className={styles.Inner}>Imagenes</span>
                <label className={styles.button} onClick={()=> {props.handleElimination()}}>Eliminar</label>
            </div>
            <form className={styles.Form} action="/upload" method="post">
            <label className={styles.Edit}>Cargar Archivos
                            {" "}
                            <input
                            type="file"
                            multiple
                            onChange={(e) => {
                                props.handlePhoto(e.target.files);
                            }}
                        />
                        </label>
            </form>
            <div className={styles.container}>      
                    <label className={styles.Edit}>{props.photos.length} archivos</label>
                </div>
        </div>
    );
}

