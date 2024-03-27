import { useNavigate } from "react-router-dom";
import { useClub } from "../controllers/api";
import styles from "../css/Search.module.css"
import { useEffect, useState } from "react";
import CardLoader from "../Components/CardLoader.jsx";
import ClubCard from '../Components/ClubCard.jsx'
import Navbar from "../Components/NavbarUsuario.jsx";
import NavbarV from "../Components/NavbarVisitante.jsx";
import { useUser } from "../hooks/user.js";
import { getUserData } from "../controllers/auth.js";


export default function Search(){
    const user = useUser();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [type, setType] = useState("Nombre");
    const [on, setOn] = useState(false);
    const [visitor, IsVisitor] = useState(true);

    function handleClick(){
        setOn(true);
    }

    useEffect(() => {
        async function fetchData() {
          if (user != null){
            IsVisitor(false)
          } 
        };
    
        fetchData();
      }, [user]);

    return(
        <div>
           {visitor ? (
        <NavbarV></NavbarV>
      ): (
        <Navbar></Navbar>
      )}
        <div className={styles.All}>
            <div className={styles.banner}>
                <h2 className={styles.title}>Encuentra la agrupación de tu preferencia </h2>
                <div className={styles.searchBar}>
                    <div className={styles.bar}>
                        <img className={styles.Img} alt="loop" src={"/search.png"}/>
                        <input className={styles.inputbar} defaultValue={"Buscador"} onChange={(e) => {setOn(false), setName(e.target.value)}} /> 
                    </div>
                    <div className={styles.Buttons}> 
                    <button className={styles.searchButton} onClick={()=>{handleClick()}}> Buscar </button>
                    <select className={styles.searchButton} value={type} style={{ maxWidth:"150px", padding:"10px", borderColor:"rgb(223, 144, 98)", backgroundColor:"rgb(223, 144, 98)", textAlign:"center"}} name="Type" onChange={(e) => {{setType(e.target.value), setOn(false)}}}> 
                        <option className={styles.option}value="Nombre"> Nombre </option>
                        <option className={styles.option} value="Categoria"> Categoria </option>
                    </select>
                    </div>
                    
                </div>
            </div>

            <div className={styles.results}>
                {on && <Game name={name} type={type} user={user}/>}
            </div>
        </div>
        </div>
    )

}

export function Game({name, type, user}){
    const clubs = useClub(name, type);
    const [values, setValues] = useState([])
    const [want, setWant] = useState(false);

    if (clubs != null && want == false){
        if (clubs.isLoading != true && clubs.isCharging != true){
            if (user != null){
                getUserInfo()
            } else {
                if (clubs.id != "no"){
                    clubs.id.forEach(club => {
                        values.push(false)
                      });
                }
                setWant(true)
            }
        }
      }
    
      async function getUserInfo() {
        const data = await getUserData(user.email);
        if (clubs.id != "no"){
            clubs.id.forEach(club => {
                let value = false;
                if (data.agrupations.includes(club) == true){
                  value = true;
                }
                values.push(value)
              });
        }
        
        setWant(true)
      }

    return(
        <div id="Cards" style={{display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
            {!want  ? (
                    <div style={{display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                        <CardLoader/>
                    </div>
                ) : (
                    clubs.data.map(({ vision,photos, objectives, name,  mision, members, contact, category }, index) => (
                        <ClubCard
                          key={name}
                          name={name}
                          description={objectives}
                          category = {category}
                          suscrito={values[index]}
                        />
                )))}
        </div>
    )

}

