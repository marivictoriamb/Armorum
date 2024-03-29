import { useState } from "react";
import { useCategories, useClubs } from "../controllers/api";
import { useNavigate } from "react-router-dom";
import styles from "../css/Categories.module.css";
import Navbar from "../Components/NavbarUsuario.jsx";
import CardLoader from "../Components/CardLoader.jsx";
import { createCategory, getCategoriesByName, getCategoriesByName2 } from "../controllers/categories.js";
import CategoryCard from "../Components/CategoryCard.jsx";
import AdminHeader from "../Components/AdminHeader.jsx";
import Sidebar from "../Components/SideBar.jsx";
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import QuestionC from "../Components/QuestionC.jsx"
import QuestionCD from "../Components/QuestionCD.jsx"

export default function Categories(){
    const categories = useCategories();
    const [name, setName] = useState("");//
    const [error, setError] = useState(false);
    const [type, setType] = useState("");

    const [prev, setPrev] = useState("");
    const [act, setAct] = useState("");
    const [trigger, setTrigger] = useState(false);
    const [trigger2, setTrigger2] = useState(false);


    const navigate = useNavigate();


    async function handleSubmit(){
      if (/[a-zA-Z]/.test(name)){

      const result = await getCategoriesByName2 (name);
      if (result.length != 0){
        alert(result[0].name.toLowerCase())
          if (result[0].name.toLowerCase() != name.toLowerCase()){
            await createCategory(name);
            restoreData();
          }else{
              setType('Ya existe una categoria con dicho nombre')
              setError(true);
          }
        
    }else{
      await createCategory(name);
      restoreData();
    }

      }else{
          setType('Valor Invalido')
          setError(true);
      }
    }

    async function restoreData(){
      window.location.reload();      
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
          {error && <ErrorUpdate key={type} error={type} />}
          <div className={styles.Options}></div>
            <div className={styles.Info}>
            <QuestionC trigger={trigger} prev={prev} category={act} setTrigger={setTrigger} restoreData={restoreData}/>
            <QuestionCD trigger={trigger2} category={act} setTrigger2={setTrigger2} restoreData={restoreData}/>
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
                  <label> Nombre:<input value={name} required={true} onChange={(e) => {setError(false), setName(e.target.value)}}/></label>
                  <button onClick={()=>(handleSubmit())}>Enviar</button>
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
                  setTrigger={setTrigger}
                  setTrigger2={setTrigger2}
                  setError={setError}
                  setType={setType}
                  setPrev={setPrev}
                  setAct={setAct}
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
  