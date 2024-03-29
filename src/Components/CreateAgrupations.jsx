import { useState,useEffect } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
//import styles from "../css/Agrupations.module.css";
import AgrupCard from "../Components/AgrupCard.jsx";
import Navbar from "../Components/NavbarUsuario.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { getCategoryById, getCategoryByIdName, getCategoryId, updateCategoryData } from "../controllers/categories.js";
import { createClub, getClubById, getClubId } from "../controllers/clubs.js";
import Loader from "../Components/Loader.jsx";
import { create } from "../hooks/create.js";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import styles from "./CreateAgrupations.module.css";


export default function CreateAgrupations({onClose}){
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
    const [isOpen, setIsOpen] = useState(true);


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

    // const toggleForm = () => {
    //     setIsOpen(!isOpen);
    // };

    // const handleClose = () => {
    //     setIsOpen(false);
    //     onClose();
    // };

  
  
    return (
        <div className={styles.container}>
            

            {isOpen && (    
                <div>
                {/* <button className={styles.closeButton} onClick={toggleForm}>x</button> */}
                <br/>
                <div className={styles.labelContainer}>
                    <label className={styles.title}>Crear Agrupacion</label>
                </div>
                    {(categories.isLoading || done == false)?(
                    <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
                        <Loader/>
                    </div>
                    ) : (
                <div className={styles.All}>
                    {error && <ErrorUpdate key={type} error={type}/>}
                    <div className={styles.Options}>
                        <form className="Create" onSubmit={handleSubmit}>
                            <label> Nombre:<input style={{width:"90%"}} required={true} value={name} onChange={(e) => {setName(e.target.value), setError(false)}}/></label>
                            <label className={styles.contact}> Contacto:<div className={styles.input}><select className={styles.select} style={{width:"15%", maxWidth:"340px"}}value={number} onChange={(e) => {setNumber(e.target.value), setError(false)}}>
                            <option className={styles.select} >0412</option>
                            <option className={styles.select} >0414</option>
                            <option className={styles.select} >0424</option>
                            <option className={styles.select} >0416</option>
                            </select><input required={true} maxLength="7" minLength="7" style={{ width:"75%"}} value={contact} onChange={(e) => setContact(e.target.value)}/></div></label>
                            <label> Mision: <br/><input style={{width:"90%"}} required={true}  value={mision} onChange={(e) => {setMision(e.target.value), setError(false)}}/></label><br/>
                            <label> Vision:<br/><input style={{width:"90%"}} required={true}  value={vision} onChange={(e) => {setVision(e.target.value), setError(false)}}/></label>
                            <label> Objetivos:<br/><input style={{width:"90%"}} required={true}  value={objectives} onChange={(e) => {setObjectives(e.target.value), setError(false)}}/></label><br/>
                            <label> Año de Creacion:<select required value={year} onChange={(e) => {setYear(e.target.value), setError(false)}} id="year" name="year">
                            {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
                            <option key={i + startYear} value={startYear + i} className={styles.select}> {startYear + i} </option> ) ) }
                            </select></label>
                            <label> Responsable:<input style={{width:"90%"}} required value={founder} onChange={(e) => {setFounder(e.target.value), setError(false)}}/></label>
                            <label className={styles.Input}>Categoria: <br/><select style={{width:"50vw", maxWidth:"340px"}}value={category} name="Categoria" onChange={(e) => {handleCategory(e.target.value), setCategory(e.target.value), setError(false)}}><br/>
                                    {categories.isLoading  ? (
                                        <option key={"loading"}> . . .</option>
                                    ) : (
                                        categories.data.map((category, id) => (<option className={styles.select} key={id} >{category.name}</option>
                                        ))
                                    )}
                                    </select></label>
                            <div className={styles.labelContainer}>        
                                <br/><button className= {styles.botonEnviar} type="submit">Enviar</button>
                            </div>
                        </form>
                    </div>
                    </div>
                )}
                    </div>)}
            </div>
            
    )
        
}