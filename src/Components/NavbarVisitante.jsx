import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NavbarVisitante.module.css";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  };

  return (
    <div className={styles.All}>
      <img
        src="/game3.png"
        onClick={handleNavigate("/landing")}
        className={styles.Img}
      />
      <div className={styles.Links}>
        <div
          onClick={() => {
            const element = document.getElementById("Cards");
            element.scrollIntoView({ behavior: "smooth" });
          }}
          className={styles.Words}
        >
          Agrupaciones
        </div>
        <div className={styles.Search}>
          <div onClick={handleNavigate("/buscador")} className={styles.Words}>
            Buscar
          </div>
          <img
            src="/search.png"
            className={styles.Buscador}
            onClick={handleNavigate("/buscador")}
          />
        </div>
      </div>
      <div className={styles.Links}>
        <img
          src="/InicioSesion.png"
          onClick={handleNavigate("/inicio")}
          className={styles.Profile}
        />
      </div>
    </div>
  );
}