import React from "react"
import styles from './Forgotten.module.css'
import { useState } from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import ErrorLogin from '../Components/ErrorLogin.jsx'
import Exit from '../Components/Exit.jsx'


export default function Forgotten(props) {
    const [email, setEmail] = useState("");
    const [popUp, setPopUp] = useState(false);
    const [popUp2, setPopUp2] = useState(false);

    async function handleSubmit(){
        setPopUp(false);
        setPopUp2(false);
        await sendPasswordResetEmail(auth, email).then(data => {
            setPopUp(true);
        }).catch(err => {   
            setPopUp2(true);
        })
    }

    function handleClose(){
        setPopUp(false);
        setPopUp2(false);
        props.setTrigger(false);
    }

    return (props.trigger) ? (
        <div className={styles.popup} style={{ width: props.targetWidth, height: props.targetHeight }}>
            <div className={styles.popupContent}>
            {popUp2 && <ErrorLogin/>}
            {popUp && <Exit/>}
                <img className={styles.Logo} alt="Logo" src="/logo.png" style={{width: "170px", height:"120px"}}/>
                <div className={styles.Tittle}>
                    <h1 style={{fontSize:"20px"}}>Olvidó su Contraseña?</h1>
                    <p style={{fontSize: "1pxx"}}> Ingrese su dirección de correo para obtener restablecer su contraseña.</p>
                </div>
                <div className={styles.CorreoP}> 
                    <p style={{fontSize: "14px"}}>Correo</p>
                    <div className={styles.CorreoInputP}><input onChange={(e) => setEmail(e.target.value)} value={email}    required={true} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}}/></div> 
                </div>
                <div className={styles.ButtonsP}>
                    <button className={styles.Establish} type="button" onClick={() => {handleSubmit()}}> Cambiar Contraseña </button>
                    <button className={styles.LoginP} style={{cursor:"pointer"}}onClick={() => {handleButtonClickP(false); handleClose()}}>Ir a Inicio de Sesion </button>
                </div>
            </div>
        </div>
    ) : "";

}
