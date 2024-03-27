import { useNavigate } from "react-router-dom";
import { getUserData, logOut, updateUserData } from "../controllers/auth";
import { useUser } from "../hooks/user";
import { useState, useEffect } from "react";
import styles from "../css/Profile.module.css";
import Question from "../Components/Question";
import Actualizacion from "../Components/Actualizacion";
import ClubCard from "../Components/ClubCard.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getClubById, getClubId } from "../controllers/clubs";
import Navbar from "../Components/NavbarUsuario.jsx";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import Loader from "../Components/Loader.jsx";
import Footer from "../Components/FooterUsuario.jsx";
import {uploadImagen, getImageUrl} from "../controllers/files.js";
import { useImageUrl } from "../hooks/files.js";


export default function Profile() {
  const navigate = useNavigate();
  const user = useUser();

  const [name, setName] = useState("...");
  const [headlineName, setHName] = useState("Nombre");
  const [headlineEmail, setHEmail] = useState("Correo");
  const [carrer, setCarrer] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("...");
  const [membresias, setMembresias] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [done, setDone] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const [trigger, setTrigger] = useState(false);
  const [act, setAct] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");


  async function restoreData() {
    const data = await getUserData(user.email);
    setName(data.name);
    setHName(data.name);
    setHEmail(data.email);
    setEmail(data.email);
    setMemberships(data.agrupations);
    setCarrer(data.carrer);
    setNumber(data.number);
    setImage(data.image);

    const newArray = await Promise.all(
      data.agrupations.map(async (club) => {
        const c = await getClubById(club);
        return c;
      })
    );
    setMembresias(newArray);
    setDone(true);
  }

  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        restoreData();
      }
    }

    fetchData();
  }, [user]);

  async function handleLogOut() {
    await logOut();
    navigate("/inicio", { replace: true });
  }

  async function handle(nombre) {
    setDone(false);
    const userData = await getUserData(user.email);
    const clubValue = await getClubId(nombre);
    const membershipValue = userData.agrupations.filter(
      (item) => item !== clubValue
    );
    await updateUserData(name, email, 1, number, carrer, image, membershipValue);
    restoreData();
    setDone(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let validations = false;

    if (/^\d{4}\d{7}$/.test(number) == true) {
      validations = true;
    } else {
      setType("Introduzca un numero valido");
      setError(true);
    }

    if (/^[a-zA-Z ]+$/.test(name) != true || name.trim() == "") {
      validations = false;
      if (error != true) {
        setError(true);
        setType("Introduzca un nombre valido");
      }
    }

    if (validations == true) {
      setAct(false);
      setTrigger(true);
    }
  }

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
          <Navbar />
          <div className={styles.Card}>
            <div className={styles.banner}>
              {act && <Actualizacion />}
              <div className={styles.Controler}>
                <div>
                  <img className={styles.Image} alt="control" src="/user.png" />
                </div>
              </div>
            </div>

            <div className={styles.menu}>
              {error && <ErrorUpdate key={type} error={type} />}
              <div className={styles.Rows}>
                <label className={styles.Nombre}>{headlineName}</label>
                <div className={styles.SecondRow}>
                  <label className={styles.Username}>{headlineEmail}</label>
                </div>
              </div>
              <form className={styles.f} onSubmit={handleSubmit}>
                <div className={styles.Button}>
                  {" "}
                  <button type="submit" className={styles.Update}>
                    Actualizar
                  </button>
                </div>
                <div className={styles.Form}>
                  <label className={styles.Input}>
                    Nombre:{" "}
                    <input
                      required
                      value={name}
                      className={styles.input}
                      onChange={(e) => {
                        {
                          setName(e.target.value), setError(false);
                        }
                      }}
                    ></input>
                  </label>
                  <label className={styles.Input}>
                    Numero:{" "}
                    <input
                      required
                      value={number}
                      className={styles.input}
                      onChange={(e) => {
                        {
                          setNumber(e.target.value), setError(false);
                        }
                      }}
                    ></input>
                  </label>
                  <label className={styles.Input}>
                    Carrera:{" "}
                    <select
                      className={styles.select}
                      style={{ width: "50vw", maxWidth: "340px" }}
                      value={carrer}
                      name="Carrera"
                      onChange={(e) => {
                        setCarrer(e.target.value);
                      }}
                    >
                      <option value="Ingenieria Civil">
                        {" "}
                        Ingenieria Civil{" "}
                      </option>
                      <option value="Ingenieria Mecanica">
                        {" "}
                        Ingenieria Mecanica{" "}
                      </option>
                      <option value="Ingenieria Produccion">
                        {" "}
                        Ingenieria Produccion{" "}
                      </option>
                      <option value="Ingenieria Quimica">
                        {" "}
                        Ingenieria Quimica{" "}
                      </option>
                      <option value="Ingenieria Electrica">
                        {" "}
                        Ingenieria Electrica{" "}
                      </option>
                      <option value="Ingenieria Sistemas">
                        {" "}
                        Ingenieria Sistemas{" "}
                      </option>
                      <option value="Ciencias Administrativas">
                        {" "}
                        Ciencias Administrativas{" "}
                      </option>
                      <option value="Economia Empresarial">
                        {" "}
                        Economia Empresarial{" "}
                      </option>
                      <option value="Contaduria Publica">
                        {" "}
                        Contaduria Publica{" "}
                      </option>
                      <option value="Psicologia"> Psicologia </option>
                      <option value="Matematicas Industriales">
                        {" "}
                        Matematicas Industriales{" "}
                      </option>
                      <option value="Educacion"> Educacion </option>
                      <option value="Idiomas Modernos">
                        {" "}
                        Idiomas Modernos{" "}
                      </option>
                      <option value="Estudios Liberales">
                        {" "}
                        Estudios Liberales{" "}
                      </option>
                      <option value="Derecho"> Derecho </option>
                    </select>
                  </label>
                  <label className={styles.Input}>
                    Correo:{" "}
                    <input
                      className={styles.input}
                      readOnly
                      value={email}
                    ></input>
                  </label>
                  <label className={styles.Input}>
                    Imagen:{" "}
                    <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
                  </label>
                </div>
              </form>
              <div className={styles.Option}>
                <label id={styles.p}>Agrupaciones</label>
              </div>
              <div className={styles.Clubs} id ="Cards">
                <div className={styles.Clubs}>
                  {membresias.map((club) => (
                    <ClubCard
                      key={club.name}
                      name={club.name}
                      description={club.objectives}
                      category={club.category}
                      suscrito={true}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.Option}>
                <label
                  id={styles.p}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  Cerrar Sesion
                </label>
              </div>
            </div>
          </div>
          <Question
            trigger={trigger}
            name={name}
            number={number}
            email={email}
            carrer={carrer}
            image={image}
            membresias={memberships}
            setTrigger={setTrigger}
            restoreData={restoreData}
            setAct={setAct}
          />
        </div>
      )}

    <div>
      <h1>Imagen</h1>
      <img src={image} style={{ width: '200px', height: '200px' }} />
    </div>

    <Footer/>
    </div>
  );
}
