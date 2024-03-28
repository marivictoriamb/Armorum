import { useNavigate } from "react-router-dom";
import styles from "./AgrupCard.module.css";

export default function CategoryCard({ name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categorias/${name}`);
  };

  return (
    <div className={styles.All}>
      <div className={styles.Card}>
        <div className={styles.banner}>
          <div
            className={styles.Image}
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <img
              style={{
                margin: "auto",
                width: "300px",
                height: "50%",
                borderRadius: "100%",
                objectFit: "contain",
              }}
              alt="control"
              src="/panda.png"
            />
          </div>
        </div>
        <br />
        <div className={styles.menu}>
            <h2 className={styles.Name}>{name}</h2>
            <button style={{ backgroundColor: "orange", padding: "5px 10px" }}>
              Desactivar
            </button>
         
        </div>
      </div>
    </div>
  );
}
