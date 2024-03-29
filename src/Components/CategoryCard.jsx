import { useNavigate } from "react-router-dom";
import styles from "./CategoryCard.module.css";
import { useState } from "react";
import { getCategoriesByName, getCategoriesByName2 } from "../controllers/categories";

export default function CategoryCard(props) {
  const [nuevo, setNuevo] = useState(props.name);

  async function handleAct(){

    if (/[a-zA-Z]/.test(nuevo)){
      const result = await getCategoriesByName(nuevo);
    if (result.length != 0){
        if (result[0].name.toLowerCase() != nuevo.toLowerCase()){
            props.setTrigger(true);
        }else{
            props.setType('Ya existe una categoria con dicho nombre')
            props.setError(true);
        }
        
    }else{
      props.setPrev(props.name);
      props.setAct(nuevo);
      props.setTrigger(true);
    }
    }else{
      props.setType('Valor Invalido')
      props.setError(true);
  }

  }

  async function handleDelete(){
    const categoryData = await getCategoriesByName(props.name);
    if (categoryData[0].agrupations.length != 0){
      props.setType("Hay agrupaciones asociadas a esta categoria")
      props.setError(true);
    }else{
      props.setAct(props.name);
      props.setTrigger2(true);
    }
  }

  return (
    <div className={styles.All}>
      <div className={styles.Card}>
        <div className={styles.banner}>
          <div
            className={styles.Image}
          >
            <img
              style={{
                margin: "auto",
                width: "250px",
                height: "50%",
                borderRadius: "100%",
                objectFit: "contain",
                backgroundColor:"rgba(255, 255, 255, 0.5)",
              }}
              alt="control"
              src="/Tree.png"
            />
          </div>
        </div>
        <br />
        <div className={styles.menu}>
        <input className={styles.Name}  value={nuevo} onChange={(e) => {setNuevo(e.target.value), props.setError(false)}}></input>
        <button onClick={()=>{handleAct()}}style={{ backgroundColor: "orange", padding: "5px 10px", cursor:"pointer"}}>
          Editar
        </button>
        <button onClick={()=>{handleDelete()}}style={{ backgroundColor: "orange", padding: "5px 10px", cursor:"pointer"}}>
          Desactivar
        </button>         
        </div>
      </div>
    </div>
  );
}
