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


    const navigate = useNavigate();


    async function handleSubmit(e){
        e.preventDefault();

        if (/\d{7}$/.test(contact) == true){
          create(categoryId, number, contact, categories, founder, members, mision, name, objectives, vision, year, navigate);
        } else {
            setType('Introduzca un numero valido')
            setError(true);
        }
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
            <form className="Create" onSubmit={handleSubmit}>
                <label> Nombre:<input required={true} value={name} onChange={(e) => {setName(e.target.value), setError(false)}}/></label>
                <label className={styles.contact}> Contacto:<div className={styles.input}><select className={styles.select} style={{width:"45%", maxWidth:"340px"}}value={number} onChange={(e) => {setNumber(e.target.value), setError(false)}}>
                <option className={styles.select} >0412</option>
                <option className={styles.select} >0414</option>
                <option className={styles.select} >0424</option>
                <option className={styles.select} >0416</option>
                  </select><input required={true} maxLength="7" minLength="7" style={{border:"none", width:"75%"}} value={contact} onChange={(e) => setContact(e.target.value)}/></div></label>
                <label> Mision:<input required={true}  value={mision} onChange={(e) => {setMision(e.target.value), setError(false)}}/></label>
                <label> Vision:<input required={true}  value={vision} onChange={(e) => {setVision(e.target.value), setError(false)}}/></label>
                <label> Objetivos:<input required={true}  value={objectives} onChange={(e) => {setObjectives(e.target.value), setError(false)}}/></label>
                <label> Año de Creacion:<select required value={year} onChange={(e) => {setYear(e.target.value), setError(false)}} id="year" name="year">
                {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
                  <option key={i + startYear} value={startYear + i} className={styles.select}> {startYear + i} </option> ) ) }
                  </select></label>
                <label> Responsable:<input required value={founder} onChange={(e) => {setFounder(e.target.value), setError(false)}}/></label>
                <label className={styles.Input}>Categoria: <select style={{width:"50vw", maxWidth:"340px"}}value={category} name="Categoria" onChange={(e) => {handleCategory(e.target.value), setCategory(e.target.value), setError(false)}}>
                        {categories.isLoading  ? (
                            <option key={"loading"}> . . .</option>
                        ) : (
                            categories.data.map((category, id) => (<option className={styles.select} key={id} >{category.name}</option>
                            ))
                        )}
                        </select></label>
                <button type="submit">Enviar</button>
            </form>
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
    )}
    </div>
    );
  }
  