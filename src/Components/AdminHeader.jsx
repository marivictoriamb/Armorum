import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminHeader.module.css";

export default function AdminHeader() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  };

  return (
    <div
      style={{ position: "sticky", width: "100%" }}
      className={`${styles.All} ${styles.OrangeLine}`}
    >
      <img
        src="/Tree.png"
        onClick={handleNavigate("/landing")}
        className={styles.Img}
        style={{ textAlign: "left", width: "200px", marginLeft: "2vw" }}
      />
      <img
        src="/name.png"
        onClick={handleNavigate("/landing")}
        className={styles.Img}
        style={{
          textAlign: "left",
          width: "280px",
          paddingLeft: "1vw",
          height: "170px",
        }}
      />
      <div className={styles.Links}>
        <img
          src="/profileHeader.png"
          onClick={handleNavigate("/perfil")}
          className={styles.Profile}
        />
      </div>
    </div>
  );
}
/*
<div className={styles.Links}>
<img src="/search.png" onClick={handleNavigate("/buscador")} className={styles.Buscador}  />
<img src="/user.png" onClick={handleNavigate("/perfil")}  className={styles.Profile} />
</div>*/
