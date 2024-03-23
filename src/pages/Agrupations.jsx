import { useState,useEffect } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Agrupations.module.css";
import AgrupCard from "../Components/AgrupCard.jsx";
import Navbar from "../Components/Navbar.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getCategoryById, getCategoryByIdName, getCategoryId, updateCategoryData } from "../controllers/categories.js";
import { createClub, getClubById, getClubId } from "../controllers/clubs.js";
import Loader from "../Components/Loader.jsx";
import { create } from "../hooks/create.js";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import AgrupProfile from "./AgrupProfile.jsx";

export default function Agrupations(){
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const categories = useCategories();
    const [values, setValues] = useState([]);

    const [number, setNumber] = useState("0412");
    const [contact, setContact] = useState(""); //
    const [founder, setFounder] = useState("");//
    const [members, setMembers] = useState([]);
    const [mision, setMision] = useState("");//
    const [name, setName] = useState("");//
    const [objectives, setObjectives] = useState("");//
    const [vision, setVision] = useState("");//
    const [year, setYear] = useState(new Date().getFullYear());//
    const [done, setDone] = useState(true)
    const [error, setError] = useState(false);
    const [type, setType] = useState("");

    const startYear = 2000;
    const endYear = new Date().getFullYear();


    const handleClickAddGroup = () => {
      navigate(`/agrupaciones/${name}`);
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

    async function handleCategory(value){
        const id = await getCategoryId(value);
        setCategoryId(id);
    }

    const [want, setWant] = useState(false);
    const clubs = useClubs();
  
    if (clubs != null && want == false){
      if (clubs.isLoading != true && clubs.isCharging != true){
        getData()
      }
    }

    async function getData(){
        const categories = await Promise.all(
            clubs.data.map(async (item) => {
              return await getCategoryByIdName(item.category);
            })
          );
          setValues(categories);
        setWant(true)
    }
  
  
    return (
      <div>
        {(categories.isLoading || done == false)?(
        <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
            <Loader/>
        </div>
        ) : (
      <div className={styles.All}>
        <Navbar></Navbar>
        {error && <ErrorUpdate key={type} error={type}/>}
        <div className={styles.Options}>
        </div>
          <div className={styles.Info}>
          <label style={{ fontSize: "70px", textAlign: "left", margin: "0", paddingLeft: "4vw" }}>Agrupaciones</label>
          <button 
            onClick={handleClickAddGroup} 
            style={{
            width: "30vw",
            marginRight:"2vw",
            padding: "1vw",
            borderRadius: "40px",
            borderColor: "rgb(255, 145, 0)",
            backgroundColor: "rgb(255, 145, 0)",
            fontSize: "35px",
            color: "white",
            float: "right"
            }}>
            Agregar agrupación
          </button>
            
          <div style={{marginTop: "50px", display: "flex", flexWrap: "wrap",flexDirection: "row",gap: "5vw",alignItems: "center",justifyContent: "center"}} >
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
            clubs.data.map(({ year, vision,photos, photosfounder, objectives, name,  mision, members, id, founder, contact, category }, index) => (
              <AgrupCard
                key={name}
                name={name}
                description={objectives}
                category = {values[index]}
              />
            )))}
            </div>
        </div>
      </div>
    )}
    </div>
    );
  }