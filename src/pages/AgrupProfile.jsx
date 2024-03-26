import { useEffect, useState } from "react";
import { useCategories } from "../controllers/api";
import styles from "../css/Profile.module.css";
import { useUser } from "../hooks/user";
import {
  getClubId,
  getClubsByName,
  updateClubData,
} from "../controllers/clubs";
import {
  getCategoryById,
  getCategoryId,
  updateCategoryData,
} from "../controllers/categories";
import { useParams } from "react-router-dom";
import CardLoader from "../Components/CardLoader";
import Actualizacion from "../Components/Actualizacion";
import QuestionA from "../Components/QuestionA";
import QuestionAD from "../Components/QuestionAD";
import { getUserById } from "../controllers/auth";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import Loader from "../Components/Loader.jsx";

export default function AgrupProfile() {
  const [category, setCategory] = useState(""); //
  const [contact, setContact] = useState(""); //
  const [founder, setFounder] = useState(""); //
  const [members, setMembers] = useState([]); //
  const [membersN, setMembersN] = useState([]); //
  const [mision, setMision] = useState(""); //
  const [name, setName] = useState(""); //
  const [objectives, setObjectives] = useState(""); //
  const [vision, setVision] = useState(""); //
  const [year, setYear] = useState(""); //
  const [id, setId] = useState(""); //
  const categories = useCategories();
  const [categoryId, setCategoryId] = useState("");
  const [prevCategoryId, setPrevCategoryId] = useState("");

  const clubName = useParams();
  const user = useUser();
  const [club, setClub] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [act, setAct] = useState(false);
  const [trigger2, setTrigger2] = useState(false);
  const [act2, setAct2] = useState(false);
  const [done, setDone] = useState(false);

  const [error, setError] = useState(false);
  const [type, setType] = useState("");

  async function fetchClubData() {
    const clubData = await getClubsByName(clubName.name);
    setClub(clubData);

    if (clubData[0].members.length != 0) {
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
      setMembersN(membersN);
    }

    const c = await getCategoryById(clubData[0].category);
    setCategory(c.name);
    setCategoryId(clubData[0].category);
    setPrevCategoryId(clubData[0].category);

    setContact(clubData[0].contact);
    setFounder(clubData[0].founder);
    setContact(clubData[0].contact);
    setMembers(clubData[0].members);
    setMision(clubData[0].mision);
    setName(clubData[0].name);
    setObjectives(clubData[0].objectives);
    setVision(clubData[0].vision);
    setYear(clubData[0].year);
    setId(clubData[0].id);
  }

  useEffect(() => {
    async function fetchData() {
      if (user != null) {
        await fetchClubData();
        setDone(true);
      }
    }

    fetchData();
  }, [user]);

  async function restoreData() {
    setError(false);
    const c = await getCategoryById(category);
    setCategory(c.name);
    setCategoryId(category);
    setPrevCategoryId(category);
    setContact(contact);
    setFounder(founder);
    setContact(contact);
    setMision(mision);
    setName(name);
    setObjectives(objectives);
    setVision(vision);
    setYear(year);
    setId(id);

    setDone(true);
  }

  async function handleCategory(c) {
    const cat = await getCategoryId(c);
    setCategoryId(cat);
  }

  async function handleDelete() {
    if (members.length == 0) {
      const c = await getCategoryById(categoryId);
      const newC = c.agrupations.filter((item) => item !== id);
      await updateCategoryData(categoryId, c.name, newC);
      setAct2(false);
      setTrigger2(true);
    } else {
      setError(true);
      setType("La agrupacion cuenta con miembros");
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
        <div>
          {act && <Actualizacion />}
          {error && <ErrorUpdate key={type} error={type} />}
          <div className="Create">
            <label>
              {" "}
              Nombre:
              <input
                className={styles.Input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Contacto:
              <input
                className={styles.Input}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Mision:
              <input
                className={styles.Input}
                value={mision}
                onChange={(e) => setMision(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Vision:
              <input
                className={styles.Input}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Objetivos:
              <input
                className={styles.Input}
                value={objectives}
                onChange={(e) => setObjectives(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Año de Creacion:
              <input
                className={styles.Input}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
            <label>
              {" "}
              Responsable:
              <input
                className={styles.Input}
                value={founder}
                onChange={(e) => setFounder(e.target.value)}
              />
            </label>
            <label className={styles.Input}>
              Categoria:{" "}
              <select
                className={styles.select}
                style={{ width: "50vw", maxWidth: "340px" }}
                value={category}
                name="Categoria"
                onChange={(e) => {
                  handleCategory(e.target.value), setCategory(e.target.value);
                }}
              >
                {categories.isLoading ? (
                  <option key={"loading"}> . . .</option>
                ) : (
                  categories.data.map((category, id) => (
                    <option className={styles.select} key={id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </label>
            <button
              onClick={() => {
                setAct(false), setTrigger(true);
              }}
            >
              Actualizar
            </button>
            <button
              onClick={() => {
                handleDelete();
              }}
            >
              Eliminar
            </button>
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
                <CardLoader />
                <CardLoader />
                <CardLoader />
              </div>
            ) : (
              membersN.map((member, index) => (
                <div>
                  <div> Nombre: {member} </div>
                </div>
              ))
            )}
          </div>
          <QuestionA
            trigger={trigger}
            prev={prevCategoryId}
            category={categoryId}
            contact={contact}
            founder={founder}
            id={id}
            members={members}
            mision={mision}
            name={name}
            objectives={objectives}
            photofounder={""}
            photos={""}
            vision={vision}
            year={year}
            setTrigger={setTrigger}
            restoreData={restoreData}
            setAct={setAct}
          />
          <QuestionAD trigger={trigger2} id={id} setTrigger2={setTrigger2} />
        </div>
      )}
    </div>
  );
}
