import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import { Link } from 'react-router-dom';

function Navbar(props) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  };

  const handleClick = () => {
    props.setScroll(true);
    window.location.href = '/landing#div-destino';
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
          onClick={handleClick}
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
          src="/profileHeader.png"
          onClick={handleNavigate("/perfil")}
          className={styles.Profile}
        />
      </div>
    </div>
  );
}

export default Navbar
