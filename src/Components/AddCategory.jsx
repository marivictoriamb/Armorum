import styles from "./CategoryCard.module.css";

export default function AddCategory(props) {

    return (
        <div className={styles.All}>
          <div className={styles.Card}>
            <div className={styles.banner}>
              <div
                className={styles.Image}
              >
                <div style={{
                    margin: "auto",
                    width: "250px",
                    height: "50%",
                    borderRadius: "100%",
                    backgroundColor:"rgba(255, 255, 255, 0.5)",
                    display:"flex",
                    justifyContent:"center"
                  }} >
                    <img
                  style={{
                    width: "50%",
                    height: "50%",
                    borderRadius: "100%",
                    objectFit:"contain",
                    transform: "translateY(50%)",
                  }}
                  alt="control"
                  src="/add.png"
                />
                </div>
                
              </div>
            </div>
            <br />
            <div className={styles.menu}>
            <input className={styles.Name}  value={props.name} onChange={(e) => {props.setName(e.target.value), props.setError(false)}}></input>
            <button onClick={()=>{props.handleSubmit()}}style={{ backgroundColor: "orange", padding: "5px 10px", cursor:"pointer"}}>
              Agregar
            </button>
            <button onClick={()=>{props.handleAdd()}}style={{ backgroundColor: "orange", padding: "5px 10px", cursor:"pointer"}}>
              Cerrar
            </button>         
            </div>
          </div>
        </div>
      );
}