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
import Slider from '../Components/SliderAgrup.jsx';


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

  const [show, setShow] = useState("...");
  const [want, setWant] = useState(false);
  const [visitor, IsVisitor] = useState(true);
  const [sdkReady, setSdkReady] = useState(false);
  const [isButtonContainerRendered, setIsButtonContainerRendered] =
    useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=Ad9nZ0bV62PEdpGYKkYBnwyCfl-G_7_z4_nAjhHHqnZuVhg1HKJlHWPQ3B8tEUDcTQitxOc88mymWKz-&currency=USD`;
    script.addEventListener("load", () => setSdkReady(true));
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (sdkReady && isButtonContainerRendered && show === "Desafiliarse") {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // Monto de la contribución
                  },
                },
              ],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Contribución realizada correctamente");
              // Implementar lógica después de la contribución exitosa
            });
          },
        })
        .render("#paypal-button-container");
    }
  }, [sdkReady, isButtonContainerRendered, show]);

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
        membersI.push(userData.image);
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

    
    if (clubData[0].photos.length != 0){
      setImage(clubData[0].photos)
      const images = await Promise.all(
          clubData[0].photos.map(async (item) => {
              return await getImageUrl(item);
          })
      );
      setImageUrl(images)
  } else {
      setImage([`agrupaciones/noimage.jpeg`])
      const result = await getImageUrl(`agrupaciones/noimage.jpeg`)
      setImageUrl([result])
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

    if (clubData[0].photos.length != 0){
      setImage(clubData[0].photos)
      const images = await Promise.all(
          clubData[0].photos.map(async (item) => {
              return await getImageUrl(item);
          })
      );
      setImageUrl(images)
  } else {
      setImage([`agrupaciones/noimage.jpeg`])
      const result = await getImageUrl(`agrupaciones/noimage.jpeg`)
      setImageUrl([result])
  }


    const c = await getCategoryById(clubData[0].category);
    setCategory(c.name);

    setDone(true);
  }

  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        fetchClubData();
      } else {
        fetchCData();
      }
    }

    fetchData();
  }, [user]);

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
          {visitor ? <NavbarV setScroll={setScroll}></NavbarV> : <Navbar setScroll={setScroll}></Navbar>} 
          <div className={styles.content}>
            <div className={styles.left}>  
              <h1 className={styles.Name}> {club[0].name} </h1>
              <Slider images={imageUrl}/>
              <div className={styles.image}>  
                <div className={styles.Buttons}>
                  {visitor ? (
                      ""
                    ) : (
                      <button
                        className={styles.Afiliacion}
                        onClick={() => {
                          handleMembership();
                        }}
                      >
                        {show}
                      </button>
                    )}
                      
                  {show === "Desafiliarse" && (
                    <div
                      id="paypal-button-container"
                      style={{ marginTop: "20px" }}
                      ref={() => setIsButtonContainerRendered(true)}
                    ></div>
                  )} 
                </div>
              </div>
            </div>

            <div className={styles.Right}>
              <div className={styles.info}>
              <h4 className={styles.Description}> Mision: {club[0].mision}</h4>
              <h4 className={styles.Description}> Vision: {club[0].vision}</h4>
                <h4 className={styles.Description}> Objetivo: {club[0].objectives}</h4>
                <h4 className={styles.Description}> Categoria: {category}</h4>
                <h4 className={styles.Description}> Miembros: </h4>
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
                  <h4 className={styles.Description}> Contacto: {club[0].contact}</h4>
                  <h4 className={styles.Description}> Año de Creacion: {club[0].year}</h4>
              </div>
            </div> 
          </div> 
          <div className = {styles.Comments}>
            <h2> comentarios, esta es el area donde iran los comentarios, faltan los comentarios </h2>
          </div>
          <Footer/>
        </div> 
        
      )}
    </div>
  );
}
