import { useState, useEffect } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Agrupations.module.css";
import AgrupCard from "../Components/AgrupCard.jsx";
import AdminHeader from "../Components/AdminHeader.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import {
  getCategoryById,
  getCategoryByIdName,
  getCategoryId,
  updateCategoryData,
} from "../controllers/categories.js";
import { createClub, getClubById, getClubId } from "../controllers/clubs.js";
import Loader from "../Components/Loader.jsx";
import { create } from "../hooks/create.js";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import AgrupProfile from "./AgrupProfile.jsx";
import Sidebar from "../Components/SideBar.jsx";
import CreateAgrupations from "../Components/CreateAgrupations.jsx";
import { useUser } from "../hooks/user.js";
import { getUserData } from "../controllers/auth.js";


export default function Agrupations() {
  const user = useUser();

  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const categories = useCategories();
  const [values, setValues] = useState([]);

  const [number, setNumber] = useState("0412");
  const [contact, setContact] = useState(""); //
  const [founder, setFounder] = useState(""); //
  const [members, setMembers] = useState([]);
  const [mision, setMision] = useState(""); //
  const [name, setName] = useState(""); //
  const [objectives, setObjectives] = useState(""); //
  const [vision, setVision] = useState(""); //
  const [year, setYear] = useState(new Date().getFullYear()); //
  const [done, setDone] = useState(true);
  const [error, setError] = useState(false);
  const [type, setType] = useState("");
  const navigate = useNavigate();
  const startYear = 2000;
  const endYear = new Date().getFullYear();
  const [showCreateAgrupations, setShowCreateAgrupations] = useState(false);

  const handleCloseCreateAgrupations = () => {
    setShowCreateAgrupations(false);
};

  /*    No hay ningún formulario entonces podría borrarse
async function handleSubmit(e){
        e.preventDefault();

        if (/\d{7}$/.test(contact) == true){
          create(categoryId, number, contact, categories, founder, members, mision, name, objectives, vision, year, navigate);
        } else {
            setType('Introduzca un numero valido')
            setError(true);
        }
      }
      */

  async function handleCategory(value) {
    const id = await getCategoryId(value);
    setCategoryId(id);
  }

  const [want, setWant] = useState(false);
  const clubs = useClubs();

  if (clubs != null && want == false) {
    if (clubs.isLoading != true && clubs.isCharging != true) {
      if (user == null){
        navigate("/landing")
      } else {
        getData();
      }
    }
  }

  async function getData() {
    const data = await getUserData(user.email);
    if (data.userRole == "1"){
      navigate("/landing")
    }else{
    const categories = await Promise.all(
      clubs.data.map(async (item) => {
        return await getCategoryByIdName(item.category);
      })
    );
    setValues(categories);
    setWant(true);
  }
  }

  return (
    <Sidebar>
      <div>
        {categories.isLoading || done == false ? (
          <div
            style={{
              width:"100vw",
              overflow:"hidden"
            }}
          >
            <Loader />
          </div>
        ) : (
          <div className={styles.All}>
            <AdminHeader></AdminHeader>
            {error && <ErrorUpdate key={type} error={type} />}
            <div className={styles.Options}></div>
            <div className={styles.Info}>
              <div className={styles.Titles}>
              <label
                style={{
                  fontSize: "30px",
                  textAlign: "left",
                  margin: "0",
                  paddingLeft: "4vw",
                }}
              >
                Agrupaciones
              </label>
              <button 
              className={styles.Add}
              onClick={() => {setShowCreateAgrupations(true)}}
            >
              Agregar agrupación
            </button>
            </div>

            <CreateAgrupations trigger={showCreateAgrupations} setTrigger={setShowCreateAgrupations} width={"100vw"} height={"100vh"}/>

              <div
                style={{
                  marginTop: "50px",
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
                      <AgrupCard
                        key={index}
                        name={name}
                        description={objectives}
                        photos = {photos}
                        category={values[index]}
                      />
                    )
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
