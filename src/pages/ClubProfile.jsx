import { useParams } from "react-router-dom";
import {
  getClubById,
  getClubId,
  getClubsByName2,
  updateClubData,
} from "../controllers/clubs.js";
import { useState, useEffect } from "react";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import {
  getUserById,
  getUserData,
  getUserId,
  updateUserData,
} from "../controllers/auth.js";
import { getImageUrl } from "../controllers/files.js";
import { useUser } from "../hooks/user";
import CardLoader from "../Components/CardLoader.jsx";
import Navbar from "../Components/NavbarUsuario.jsx";
import NavbarV from "../Components/NavbarVisitante.jsx";
import { getCategoryById } from "../controllers/categories.js";
import Loader from "../Components/Loader.jsx";
import Footer from "../Components/FooterUsuario.jsx";
import Slider from "../Components/SliderAgrup.jsx";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaymentPopup from "../Components/PaymentPopUp.jsx";
import { getCommentsByAgrupation } from "../controllers/comments.js";
import CommentSection from "../Components/CommentsSection.jsx";

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser();
  const [done, setDone] = useState(false);

  const [club, setClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [membersNames, setMembersNames] = useState([]);
  const [membersId, setMembersId] = useState([]);
  const [membersI, setMembersI] = useState([]);
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);

  const [show, setShow] = useState("...");
  const [want, setWant] = useState(false);
  const [visitor, IsVisitor] = useState(true);

  async function handleMembership() {
    if (show != "...") {
      setDone(false);

      const userData = await getUserData(user.email);
      const membershipValue = userData.agrupations;
      if (want != true) {
        membershipValue.push(club[0].id);
        await updateUserData(
          userData.name,
          userData.email,
          userData.userRole,
          userData.number,
          userData.carrer,
          userData.image,
          membershipValue
        );
        const id = await getUserId(user.email);
        membersId.push(id);
        membersNames.push(userData.name);
        const img = await getImageUrl(userData.image);
        membersI.push(img);
        await updateClubData(
          club[0].category,
          club[0].contact,
          club[0].id,
          membersId,
          club[0].mision,
          club[0].name,
          club[0].objectives,
          club[0].photos,
          club[0].vision,
          club[0].year
        );
        setShow("Desafiliarse");
      } else {
        const membershipValue = userData.agrupations.filter(
          (item) => item !== club[0].id
        );
        const id = await getUserId(user.email);
        const newMembers = membersId.filter((member) => member !== id);
        setMembersId(newMembers);
        await updateUserData(
          userData.name,
          userData.email,
          userData.userRole,
          userData.number,
          userData.carrer,
          userData.image,
          membershipValue
        );
        await updateClubData(
          club[0].category,
          club[0].contact,
          club[0].id,
          newMembers,
          club[0].mision,
          club[0].name,
          club[0].objectives,
          club[0].photos,
          club[0].vision,
          club[0].year
        );
        if (club[0].members != []) {
          const membersData = await Promise.all(
            newMembers.map(async (item) => {
              return await getUserById(item);
            })
          );

          const membersN = await Promise.all(
            newMembers.map(async (item) => {
              return await item.name;
            })
          );

          const membersIm = await Promise.all(
            membersData.map(async (item) => {
              return await getImageUrl(item.image);
            })
          );
          setMembersNames(membersN);
          setMembers(membersData);
          setMembersI(membersIm);
          setShow("Afiliarse");
        }
      }

      setWant(!want);
      setDone(true);
    }
  }


  async function fetchClubData() {
    const clubData = await getClubsByName2(clubName.name);
    setClub(clubData);

    if (clubData[0].members != []) {
      const membersData = await Promise.all(
        clubData[0].members.map(async (item) => {
          return await getUserById(item);
        })
      );

      const membersN = await Promise.all(
        membersData.map(async (item) => {
          return await item.name;
        })
      );

      const membersIm = await Promise.all(
        membersData.map(async (item) => {
          return await getImageUrl(item.image);
        })
      );
      setMembers(membersData);
      setMembersId(clubData[0].members);
      setMembersNames(membersN);
      setMembersI(membersIm);
    }

    if (clubData[0].photos.length != 0) {
      setImage(clubData[0].photos);
      const images = await Promise.all(
        clubData[0].photos.map(async (item) => {
          return await getImageUrl(item);
        })
      );
      setImageUrl(images);
    } else {
      setImage([`agrupaciones/noimage.jpeg`]);
      const result = await getImageUrl(`agrupaciones/noimage.jpeg`);
      setImageUrl([result]);
    }

    if (user != null && clubData != null) {
      const data = await getUserData(user.email);
      const clubValue = await getClubId(clubData[0].name);
      const membershipValue = data.agrupations;
      if (membershipValue.includes(clubValue) == true) {
        setWant(true);
        setShow("Desafiliarse");
      } else {
        setWant(false);
        setShow("Afiliarse");
      }

      const c = await getCategoryById(clubData[0].category);
      setCategory(c.name);

      IsVisitor(false);
      setDone(true);
    }
  }

  async function fetchCData() {
    const clubData = await getClubsByName2(clubName.name);
    setClub(clubData);

    if (clubData[0].members != []) {
      const membersData = await Promise.all(
        clubData[0].members.map(async (item) => {
          return await getUserById(item);
        })
      );

      const membersN = await Promise.all(
        membersData.map(async (item) => {
          return await item.name;
        })
      );
      setMembers(membersData);
      setMembersId(clubData[0].members);
      setMembersNames(membersN);
    }

    if (clubData[0].photos.length != 0) {
      setImage(clubData[0].photos);
      const images = await Promise.all(
        clubData[0].photos.map(async (item) => {
          return await getImageUrl(item);
        })
      );
      setImageUrl(images);
    } else {
      setImage([`agrupaciones/noimage.jpeg`]);
      const result = await getImageUrl(`agrupaciones/noimage.jpeg`);
      setImageUrl([result]);
    }

    const c = await getCategoryById(clubData[0].category);
    setCategory(c.name);

    setDone(true);
  }

  useEffect(() => {
    if (user != null) {
      fetchClubData();
    } else {
      fetchCData(); // Asegúrate de que esta función no necesite también cargar los comentarios
    }
  }, [user, clubName.name]);

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
        <div className={styles.container}>
          {visitor ? (
            <NavbarV setScroll={setScroll}></NavbarV>
          ) : (
            <Navbar setScroll={setScroll}></Navbar>
          )}
          <div className={styles.content}>
            <div className={styles.left}>
              <h1 className={styles.Name}> {club[0].name} </h1>
              <Slider images={imageUrl} />
              <div className={styles.image}>
                {visitor ? (
                  ""
                ) : (
                  <div className={styles.Buttons}>
                    <button
                      className={styles.Afiliacion}
                      onClick={() => {
                        handleMembership();
                      }}
                    >
                      {show}
                    </button>
                    <button
                      className={styles.Afiliacion}
                      onClick={() => setShowPaymentPopup(true)}
                    >
                      Contribucion
                    </button>
                    {showPaymentPopup && (
                      <PaymentPopup
                        setTrigger={setShowPaymentPopup}
                        // Aquí pasarías los props necesarios para mostrar la información de la tarjeta
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={styles.Right}>
              <div className={styles.info}>
                <h4>Misión</h4>
                <div className={styles.Description}> {club[0].mision}</div>
                <h4> Visión </h4>
                <div className={styles.Description}> {club[0].vision}</div>
                <h4> Objetivo </h4>
                <div className={styles.Description}> {club[0].objectives}</div>
                <div className={styles.InfoCard}>
                  <div className={styles.card}>
                    {" "}
                    Categoria{" "}
                    <div className={styles.cardDescription}>
                      {" "}
                      {category}
                    </div>{" "}
                  </div>
                  <div className={styles.card}>
                    {" "}
                    Contacto{" "}
                    <div className={styles.cardDescription}>
                      {" "}
                      {club[0].contact}
                    </div>{" "}
                  </div>
                  <div className={styles.card}>
                    {" "}
                    Año de Creacion{" "}
                    <div className={styles.cardDescription}>
                      {" "}
                      {club[0].year}
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {visitor ? (""):(
            <div style={{width:"95%"}}>
            <div className={styles.MembersContainer}>
            <h4>Miembros</h4>
            {membersNames.length == 0 ? (
              <div className={styles.Members}>
                <h4>No hay miembros actualmente</h4>
              </div>
            ) : (
              <div className={styles.Members}>
                {membersNames.map((name, index) => (
                  <GameCard key={index} name={name} image={membersI[index]} />
                ))}
              </div>
            )}
          </div>
          <div className={styles.CommentSection}>
          Comentarios
          <div className={styles.Comments}>
            <CommentSection
              currentUser={user}
              agrupationId={club[0]} // Asegúrate de que club[0].id es la ID correcta
            />
          </div>
          </div>
          </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
}
