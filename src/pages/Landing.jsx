import { useState } from "react";
import { useClubs } from "../controllers/api.js";
import ClubCard from "../Components/ClubCard.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getUserData, logOut } from "../controllers/auth.js";
import { useUser } from "../hooks/user.js";
import styles from "../css/Landing.module.css";
import Navbar from "../Components/Navbar.jsx";
import { Carrusel } from "../Components/Carrusel.jsx";

export default function Landing() {
  const [want, setWant] = useState(false);

  const user = useUser();
  const clubs = useClubs();
  const [values, setValues] = useState([]);

  if (clubs != null && user != null && want == false){
    if (clubs.isLoading != true && clubs.isCharging != true){
      getUserInfo()
    }
  }

  async function getUserInfo() {
    const data = await getUserData(user.email);
    clubs.id.forEach(club => {
      let value = false;
      if (data.agrupations.includes(club) == true){
        value = true;
      }
      values.push(value)
    });
    setWant(true)
  }


  return (
    <div className={styles.All}>
      <Navbar></Navbar>
      <div className={styles.Info}>
      <div className={styles.Option}>
          <div className={styles.Border}><label id={styles.p} >Sobre Nosotros</label></div>
        </div>
        <Carrusel/>
        <div className={styles.Option}>
          <div className={styles.Border}><label id={styles.p} >Nuestras Agrupaciones</label></div>
        </div>

        <div style={{display: "flex", flexWrap: "wrap",flexDirection: "row",gap: "5vw",alignItems: "center",justifyContent: "center"}} >
          {!want ?  (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "5vw",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </div>
        ) : (
          clubs.data.map(({ vision,photos, objectives, name,  mision, members, contact, category }, index) => (
            <ClubCard
              key={name}
              name={name}
              description={objectives}
              category = {category}
              suscrito={values[index]}
            />
          )))}
          </div>
      </div>
    </div>
  );
}
