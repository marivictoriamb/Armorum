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
      className={styles.All}
    >
      <img
        src="/game3.png"
        onClick={handleNavigate("/landing")}
        className={styles.Img}
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

