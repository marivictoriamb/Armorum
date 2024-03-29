import styles from './PhotosContainer.module.css'

export default function PhotosContainer(props){
    return(
        <div className={styles.card}>
            <div className={styles.top}>
            <span className={styles.Inner}>Imagenes</span>
                <button>Agrega<input
                            type="file"
                            multiple
                            onChange={(e) => {
                                props.handlePhoto(e.target.files);
                            }}
                        /></button>
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
                    {props.photosUrl.map((url, index) => (
                        <div className={styles.image}>
                        {props.photos[index] != `agrupaciones/noimage.jpeg` && (
                            <>
                            <img src={url} alt="image"/>
                            <span onClick={()=>{props.handleElimination(props.photos[index], props.photosUrl[index])}}>&times;</span>
                            </>
                        )}
                        </div>
                    ))}
            </div>
        </div>
    );
}

