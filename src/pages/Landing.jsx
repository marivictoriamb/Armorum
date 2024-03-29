import { useState, useEffect, useRef } from "react";
import { useClubs } from "../controllers/api.js";
import ClubCard from "../Components/ClubCard.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getUserData, logOut } from "../controllers/auth.js";
import { useUser } from "../hooks/user.js";
import styles from "../css/Landing.module.css";
import Navbar from "../Components/NavbarUsuario.jsx";
import NavbarV from "../Components/NavbarVisitante.jsx";
import { Carrusel } from "../Components/Carrusel.jsx";
import Footer from "../Components/FooterUsuario.jsx";
import Loader from "../Components/Loader.jsx";
import Slider from "../Components/Slider.jsx";

export default function Landing() {
  const [want, setWant] = useState(false);

  const user = useUser();
  const clubs = useClubs();
  const [values, setValues] = useState([]);
  const [visitor, IsVisitor] = useState(true);
  const [done, setDone] = useState(false);
  const [scroll, setScroll] = useState(false);


  const images = [];
  for (let i = 1; i <= 4; i++) {
    images.push(`/unimet${i}.png`);
  }

  if (clubs != null && want == false) {
    if (clubs.isLoading != true && clubs.isCharging != true) {
      if (user != null){
        getUserInfo();
      } else {
        getInfo();
      }
      
    }
  }

  async function getUserInfo() {
    const data = await getUserData(user.email);
    clubs.id.forEach((club) => {
      let value = false;
      if (data.agrupations.includes(club) == true) {
        value = true;
      }
      values.push(value);
    });
    setDone(true)
    IsVisitor(false);
    setWant(true);
  }

  async function getInfo() {
    clubs.id.forEach((club) => {
      values.push(false);
    });
    setDone(true)
    setWant(true);
  }

  const divDestinoRef = useRef(null);

  useEffect(() => {
    if (divDestinoRef.current) {
      if(scroll){
        divDestinoRef.current.scrollIntoView({ behavior: 'smooth' });
        setScroll(false);
      }
      //console.log("NO ENTRA EN EL IF")
    }
  }, [done]);

  return (
    <div>
    {done == false ? (
      <div
        style={{
          margin: "30px",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          gap: "5vw",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    ) : (
    <div className={styles.All}>
      {visitor ? (
        <NavbarV></NavbarV>
      ): (
        <Navbar setScroll={setScroll} />
      )}
      <Slider images={images}/>
      <div className={styles.Info}>
        <div className={styles.Option}>
          <div className={styles.Border}>
            <label id={styles.p}>Sobre Nosotros</label>
          </div>
        </div>
        <div id="carruselSection">
          <Carrusel />
        </div>
        <div className={styles.Option}>
          <div className={styles.Border}>
            <label id={styles.p}>Nuestras Agrupaciones</label>
          </div>
        </div>

        <div
          ref={divDestinoRef} id ="div-destino"
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            gap: "5vw",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!want ? (
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
            clubs.data.map(
              (
                {
                  year,
                  vision,
                  photos,
                  objectives,
                  name,
                  mision,
                  members,
                  id,
                  contact,
                  category,
                },
                index
              ) => (
                <ClubCard
                  key={index}
                  name={name}
                  description={objectives}
                  category={category}
                  suscrito={values[index]}
                  photos={photos}
                />
              )
            )
          )}
        </div>
      </div>
      <Footer/>
    </div>
  )}
  </div>
  );
}

