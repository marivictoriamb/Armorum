import styles from "./FooterUsuario.module.css";
import { useNavigate } from "react-router-dom";

export default function FooterUsuario(){
    const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  };

    return(
        <div className={styles.All}>
            <div className={styles.Container}>
                <div className={styles.Row}>
                    <div className={styles.logos}>
                        <img src="/logo.png" className={styles.Image}/>
                        <div className={styles.Referencias}>
                        <img src="/ig.png" className={styles.Icons} />
                        <img src="/fb.png" className={styles.Icons}/>
                        </div>
                    </div>
                    <div className={styles.Column}>
                        <h4>Categorías</h4>
                    </div>
                    <div className={styles.Column}>
                        <h4 onClick={handleNavigate("/Perfil")}>Perfil</h4>
                        <ul>

                        </ul>
                    </div>
                </div>
                <div className={styles.Pie}>
                    <hr />
                    <div className={styles.Row}>
                        &copy;{new Date().getFullYear()} Universidad Metropolitana | Todos los derechos reservados.
                    </div>
                </div>
            </div>
        </div>
    );

}