import { useState,useEffect } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Landing.module.css";
import AgrupCard from "../Components/AgrupCard.jsx";
import Navbar from "../Components/Navbar.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getCategoryById, getCategoryByIdName, getCategoryId, updateCategoryData } from "../controllers/categories.js";
import { createClub, getClubById, getClubId } from "../controllers/clubs.js";


export default function Agrupations(){
    const [category, setCategory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const categories = useCategories();
    const [values, setValues] = useState([]);

    const [contact, setContact] = useState(""); //
    const [founder, setFounder] = useState("");//
    const [members, setMembers] = useState([]);
    const [mision, setMision] = useState("");//
    const [name, setName] = useState("");//
    const [objectives, setObjectives] = useState("");//
    const [vision, setVision] = useState("");//
    const [year, setYear] = useState("");//


    const navigate = useNavigate();


    async function handleSubmit(){
        await createClub(categoryId, contact, founder, members, mision, name, objectives, "", "", vision, year);
        const c = await getCategoryById(categoryId)
        const id = await getClubId(name)
        const newC = c.agrupations;
        newC.push(id)
        await updateCategoryData(categoryId, c.name, newC)
        navigate(`/agrupaciones/${name}`);
    }

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
      <div className={styles.All}>
        <Navbar></Navbar>
        <div className={styles.Options}>
            <div className="Create">
                <label> Nombre:<input value={name} onChange={(e) => setName(e.target.value)}/></label>
                <label> Contacto:<input value={contact} onChange={(e) => setContact(e.target.value)}/></label>
                <label> Mision:<input value={mision} onChange={(e) => setMision(e.target.value)}/></label>
                <label> Vision:<input value={vision} onChange={(e) => setVision(e.target.value)}/></label>
                <label> Objetivos:<input value={objectives} onChange={(e) => setObjectives(e.target.value)}/></label>
                <label> Año de Creacion:<input value={year} onChange={(e) => setYear(e.target.value)}/></label>
                <label> Responsable:<input value={founder} onChange={(e) => setFounder(e.target.value)}/></label>
                <label className={styles.Input}>Categoria: <select className={styles.select} style={{width:"50vw", maxWidth:"340px"}}value={category} name="Categoria" onChange={(e) => {handleCategory(e.target.value), setCategory(e.target.value)}}>
                        {categories.isLoading  ? (
                            <option key={"loading"}> . . .</option>
                        ) : (
                            categories.data.map((category, id) => (<option className={styles.select} key={id} >{category.name}</option>
                            ))
                        )}
                        </select></label>
                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
        <div className={styles.Info}>
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
    );
  }
  