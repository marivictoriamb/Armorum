import { useState } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Landing.module.css";
import Navbar from "../Components/Navbar.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { createCategory } from "../controllers/categories.js";
import CategoryCard from "../Components/CategoryCard.jsx";


export default function Categories(){
    const categories = useCategories();
    const [name, setName] = useState("");//
 


    const navigate = useNavigate();


    async function handleSubmit(){
        await createCategory(name);
        navigate(`/categorias/${name}`);
    }


    const [want, setWant] = useState(false);
  
    if (categories != null && want == false){
      if (categories.isLoading != true && categories.isCharging != true){
        setWant(true)
      }
    }
  
    return (
      <div className={styles.All}>
        <Navbar></Navbar>
        <div className={styles.Options}>
            <div className="Create">
                <label> Nombre:<input value={name} onChange={(e) => setName(e.target.value)}/></label>
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
            categories.data.map(({ name, agrupations }, index) => (
              <CategoryCard
                key={name}
                name={name}
              />
            )))}
            </div>
        </div>
      </div>
    );
  }
  