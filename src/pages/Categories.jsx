import { useState } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Categories.module.css";
import Navbar from "../Components/NavbarUsuario.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { createCategory } from "../controllers/categories.js";
import CategoryCard from "../Components/CategoryCard.jsx";
import AdminHeader from "../Components/AdminHeader.jsx";
import Sidebar from "../Components/SideBar.jsx";

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
      <Sidebar>
        <div>
        <div className={styles.All} >
          <AdminHeader></AdminHeader>
          <div className={styles.Options}></div>
            <div className={styles.Info}>
              <label
                style={{
                  fontSize: "30px",
                  textAlign: "left",
                  margin: "0",
                  paddingLeft: "4vw",
                }}
              >
                Categorias
              </label>
              <button
                style={{
                  width: "30vw",
                  marginRight: "10vw",
                  padding: "1vw",
                  borderRadius: "40px",
                  borderColor: "rgb(255, 145, 0)",
                  backgroundColor: "rgb(255, 145, 0)",
                  fontSize: "15px",
                  color: "white",
                  float: "right",
                }}
              >
                Agregar categorias
              </button>
          <div className={styles.Options}>
              <form className="Create">
                  <label> Nombre:<input value={name} required={true} onChange={(e) => setName(e.target.value)}/></label>
                  <button button="submit" onClick={handleSubmit}>Enviar</button>
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
              categories.data.map(({ name, agrupations }, index) => (
                <CategoryCard
                  key={index}
                  name={name}
                />
              )))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </Sidebar>
    );
  }
  