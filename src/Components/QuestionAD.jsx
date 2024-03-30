import React from "react"
import styles from './Question.module.css'
import { updateUserData } from "../controllers/auth";
import { deleteClub } from "../controllers/clubs";
import { useNavigate } from "react-router-dom";
import { getCategoryById, updateCategoryData } from "../controllers/categories";


function QuestionAD(props) {
    const navigate = useNavigate();

    async function handleData(){
        const c = await getCategoryById(props.categoryId)
        const newC = c.agrupations.filter((item) => item !== props.id );
        await updateCategoryData(props.categoryId, c.name, newC)
        await deleteClub(props.id);
        navigate(`/agrupaciones`);
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
                    <button className={styles.No} style={{cursor:"pointer"}}onClick={() => {props.setTrigger2(false)}}>No </button>
                </div>
            </div>
        </div>
    ) : "";

}
export default QuestionAD