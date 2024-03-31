import { useNavigate } from "react-router-dom";
import React from "react"
import styles from './Question.module.css'
import { updateClubData } from "../controllers/clubs";
import { getCategoryById, updateCategoryData } from "../controllers/categories";


function QuestionA(props) {
    const navigate = useNavigate();

    async function handleData(){
        let photo = []
        if (props.photos[0] != `agrupaciones/noimage.jpeg`){
            photo = props.photos;
        }
        try{
            const c = await getCategoryById(props.category)
        const newC = c.agrupations
        newC.push(props.id)
        await updateCategoryData(props.category, c.name, newC)

        const p = await getCategoryById(props.prev)
        const newP = p.agrupations.filter((item) => item !== props.id );
        await updateCategoryData(props.prev, p.name, newP)

        await updateClubData(props.category, props.contact, props.id, props.members, props.mision, props.name, props.objectives, photo, props.vision, props.year);
        } catch(e){
            
        }


        navigate(`/agrupaciones/${props.name}`);
        props.setAct(true);
        props.setTrigger(false);
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
                    <button className={styles.No} style={{cursor:"pointer"}}onClick={() => {props.restoreData(), props.setTrigger(false)}}>No </button>
                </div>
            </div>
        </div>
    ) : "";

}
export default QuestionA