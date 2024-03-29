import React from "react"
import styles from './Question.module.css'
import { getCategoriesByName, getCategoryId, updateCategoryData } from "../controllers/categories";
import { useNavigate } from "react-router-dom";


function Question(props) {
    const navigate = useNavigate();

    async function handleData(){
        const data = await getCategoriesByName(props.prev);
        const id = await getCategoryId(props.prev);
        await updateCategoryData(id, props.category, data[0].agrupations);
        props.setTrigger(false);
        props.restoreData()
        
    }
    return (props.trigger) ? (
        <div className={styles.popup} style={{ width: props.targetWidth, height: props.targetHeight }}>
            <div className={styles.popupContent}>
                <img className={styles.Logo} alt="Logo" src="/question.png" style={{width: "20vh", height:"20vh"}}/>
                <div className={styles.Tittle}>
                    <h1 className={styles.Title} >Alerta</h1>
                    <p className={styles.Description}> Esta seguro que desea hacer dichos cambios?</p>
                </div>
                <div className={styles.ButtonsP}>
                    <button className={styles.Yes} style={{cursor:"pointer"}}  onClick={() => {handleData()}}> Si </button>
                    <button className={styles.No} style={{cursor:"pointer"}}onClick={() => {props.setTrigger(false), props.restoreData()}}>No </button>
                </div>
            </div>
        </div>
    ) : "";

}
export default Question