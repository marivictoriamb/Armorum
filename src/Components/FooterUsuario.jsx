import styles from "./FooterUsuario.module.css";
import { useNavigate } from "react-router-dom";

export default function FooterUsuario() {
  const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  };

  return (
    <div className={styles.All}>
      <div className={styles.Container}>
        <div className={styles.Row}>
          <div className={styles.logos}>
            <a href="https://www.unimet.edu.ve/">
              <img src="/logo.png" className={styles.Image} />
            </a>
          </div>
          <div className={styles.Referencias}>
          <div className={styles.Column}>
              <a href="https://www.instagram.com/unimet/?hl=es">
                <img src="/ig.png" className={styles.Icons} />
              </a>
          </div>
          <div className={styles.Column}>
              <a href="https://www.facebook.com/unimet/?locale=es_LA">
                <img src="/fb.png" className={styles.Icons} />
              </a>
          </div>
          <div className={styles.X} >
              <a href="https://twitter.com/Unimet?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                <img src="/x.png" className={styles.Icons} id={styles.x}/>
              </a>
          </div>
          </div>
        </div>
        <div className={styles.Pie}>
          <hr />
          <div className={styles.Row}>
            &copy;{new Date().getFullYear()} Universidad Metropolitana | Todos
            los derechos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}
