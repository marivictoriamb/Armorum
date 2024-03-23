import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"

export default function Navbar() {

  const [clicked, setClicked] = useState(false)
  const navigate = useNavigate();

  const handleNavigate = (name) => () => {
    navigate(name);
  }

  return (
      <div className={styles.All}>
        <img src="/game3.png"  onClick={handleNavigate("/landing")}  className={styles.Img}/>
        <img src="/search.png" onClick={handleNavigate("/buscador")} className={styles.Buscador}  />
        <img src="/user.png" onClick={handleNavigate("/perfil")}  className={styles.Profile} />
      </div>
  )

}
