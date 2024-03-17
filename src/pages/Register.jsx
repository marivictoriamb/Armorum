import { useState, useEffect } from 'react'
import styles from '../css/Login.module.css'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import ErrorRegister from '../Components/ErrorRegister.jsx'
import { registerWithCredentials, signUpGoogle } from '../controllers/auth.js'
import { useNavigate } from "react-router-dom";
import {useUser} from "../hooks/user.js"

function Register(){
  const submit = useRequiered();
  const password = usePassword();
  const [popUp, setPopUp] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const [number, setNumber] = useState(0);
  const [carrer, setCarrer] = useState("");
  const navigate = useNavigate();
  const user = useUser();


  useEffect(() => {
    if (user != null){
      navigate("/landing", {replace: true});
    }
  }, [user, navigate]);

  const handleRegister = async () => {
    setPopUp(false);
      const user = await registerWithCredentials(name, email, passw,  number, carrer);
      if (user == null){
        setPopUp(true)
      } 
  };

  function handleBack(){
    if (user != null){
      navigate("/landing", {replace: true});
    } else {
      navigate("/registro", {replace: true});
    }
}


  async function handleGoogleRegister() {
    setPopUp(false);
    const user = await signUpGoogle();
    if (user == null){
      setPopUp(true)
    }
  };

  return (
    <div className={styles.All}>
      <img className={styles.Inicio} alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" />
      <div className={styles.Information}  >
        {popUp && <ErrorRegister/>}
        <div className={styles.Top2} > 
        <p style={{fontSize: "20px", width:"90%", textAlign:'center', fontWeight:"600"}}>Crear Cuenta</p>
        <button style={{backgroundColor:"white", border:"none", outline:"none", cursor:"pointer"}} onClick={() => handleBack()}><img className={styles.Logo}  alt="Logo" src="logo.png" style={{marginTop:"2px", width: "25vh", height:"15vh"}}/></button>
        </div>
        <form>
          <div className={styles.Form}>
            <div className={styles.Nombre}> 
              <p id={styles.p} style={{fontSize: "14px"}}>Nombre y Apellido</p>
              <div className={styles.NombreInput}><input required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setName(e.target.value)}/></div> 
            </div>
            <div className={styles.Correo}> 
              <p id={styles.p} style={{fontSize: "14px"}}>Correo</p>
              <div className={styles.CorreoInput}><input pattern=".*@correo.unimet.edu.ve" required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)}/></div> 
            </div>
            <div className={styles.Contrasena}>
              <div className={styles.ContrasenaText}>
                <p id={styles.p} style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "22px", height:"22px", cursor:"pointer"}}/>
              </div>
              <div className={styles.ContrasenaInput}><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)}/>
              </div>
              <label className={styles.Details} style={{fontSize:"12px"}}>Usa de 6 a 8 caracteres</label>
            </div>
            <div className='Number'> 
              <p style={{fontSize: "14px"}}>Telefono</p>
              <div className='TelefonoInput'><input pattern="^04\d{9}" maxLength="11" minLength="11" required = {submit.isSubmit} type="number" style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setNumber(e.target.value)}/></div> 
            </div>
            <div className='Carrer'> 
              <p style={{fontSize: "14px"}}>Carrera</p>
              <div className='CarrerInput'><select name="CarrerOption" onChange={(e) => setCarrer(e.target.value)}>
                            <option value="Ingenieria Civil"> Ingenieria Civil </option>
                            <option value="Ingenieria Mecanica"> Ingenieria Mecanica </option>x
                            <option value="Ingenieria Produccion"> Ingenieria Produccion </option>
                            <option value="Ingenieria Quimica"> Ingenieria Quimica </option>
                            <option value="Ingenieria Electrica"> Ingenieria Electrica </option>
                            <option value="Ingenieria Sistemas"> Ingenieria Sistemas </option>
                            <option value="Ciencias Administrativas"> Ciencias Administrativas </option>
                            <option value="Economia Empresarial"> Economia Empresarial </option>
                            <option value="Contaduria Publica"> Contaduria Publica </option>
                            <option value="Psicologia"> Psicologia </option>
                            <option value="Matematicas Industriales"> Matematicas Industriales </option>
                            <option value="Educacion"> Educacion </option>
                            <option value="Idiomas Modernos"> Idiomas Modernos </option>
                            <option value="Estudios Liberales"> Estudios Liberales </option>
                            <option value="Derecho"> Derecho </option>
                        </select></div> 
            </div>
            <div className={styles.Buttons}>
              <button className={styles.Login} type="button" onClick={() => {submit.handleButtonClick(true), handleRegister()}}> Crear cuenta </button>
              <button className={styles.Register} style={{cursor:"pointer"}}onClick={() => {submit.handleButtonClick(false), navigate("/inicio")}}>Ya tienes una cuenta? Inicia Sesion </button>
            </div>
            <div className={styles.Option}>
                <p id={styles.p} style={{fontSize: "16px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className={styles.Google}>
              <button type="button" className={styles.GoogleButton}  onClick={() => {handleGoogleRegister()}}>Registrate con Google </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

