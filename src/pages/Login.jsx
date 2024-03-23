import { useEffect, useState } from 'react'
import styles from '../css/Login.module.css'
import ErrorLogin from '../Components/ErrorLogin.jsx'
import { useRequiered } from '../hooks/requiered.js'
import {usePassword} from '../hooks/password.js'
import {useUser} from "../hooks/user.js"
import { loginWithCredentials, signInGoogle } from '../controllers/auth.js'
import { useNavigate } from "react-router-dom";
import Forgotten from '../Components/Forgotten.jsx'


function Login(){
  const submit = useRequiered();
  const password = usePassword();
  const [popUp, setPopUp] = useState(false);
  const [popUp2, setPopUp2] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [email, setEmail] = useState("");
  const [passw, setPassw] = useState("");
  const navigate = useNavigate();
  const user = useUser();

  

  useEffect(() => {
    if (user != null){
      navigate("/landing", {replace: true});
    }
  }, [user, navigate]);

  function handleBack(){
    if (user != null){
      navigate("/landing", {replace: true});
    } else {
      navigate("/inicio", {replace: true});
    }
}

  const handleLogin = async () => {
    setPopUp(false);
      const user = await loginWithCredentials(email, passw, toggle);
      if (user == null){
        setPopUp(true);
      }
  };

  const handleGoogleLogin = async () => {
    setPopUp(false);
    const user = await signInGoogle(toggle);
    if (user == null){
      setPopUp(true);
    }
};

  function handleToggle(){
    setToggle(!toggle);
  }
  

  return (
    <div className={styles.All}>
      <div className={styles.Information} >
      <div className={styles.Top1} > 
        <button style={{backgroundColor:"white", border:"none", outline:"none", cursor:"pointer"}} onClick={() => handleBack()}><img className={styles.Logo}  alt="Logo" src="/logo.png" style={{marginTop:"2px", width: "25vh", height:"15vh"}}/></button>
        <p style={{fontSize: "20px", width:"90%", textAlign:'center', fontWeight:"600"}}>Inicio de Sesion</p>
        </div>
        <form>
          <div className={styles.Form}>
            <div className={styles.Correo}> 
              <p id={styles.p} style={{fontSize: "14px"}}>Correo</p>
              <div className={styles.CorreoInput}><input required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} onChange={(e) => setEmail(e.target.value)} value={email}/></div> 
            </div>
            <div className={styles.Contrasena}>
              <div className={styles.ContrasenaText}>
                <p id={styles.p} style={{fontSize: "14px"}}>Contraseña</p>
                <img onClick={() => password.handlePasswordClick(!password.isVisible)} alt="eye" src={password.eye} style={{width: "22px", height:"22px", cursor:"pointer"}}/>
              </div>
              <div className={styles.ContrasenaInput}><input 
                  required = {submit.isSubmit} style={{fontSize: "12px", padding:"10px", paddingLeft:"20px"}} type= {password.password}
                  minLength="6" maxLength="8" onChange={(e) => setPassw(e.target.value)} value={passw}/>
              </div>
              <button type="button" className={styles.Forget} style={{cursor:"pointer", color:"rgb(87, 86, 86)"}}onClick={() => {submit.handleButtonClick(false); setPopUp2(true);}}>Olvidaste tu contraseña?</button>
              <Forgotten trigger={popUp2}width={"100vw"} height={"100vh"} setTrigger={setPopUp2}/>
              <div className={styles.Type} >
                {toggle ? <p style={{fontSize: "14px"}}>Administrador</p> : <p style={{fontSize: "14px"}}>Estudiante </p>}
                <div className={styles.Toggle} style={{cursor:"pointer"}} onClick={() => {handleToggle()}}>
                  {toggle ? <div className={styles.ToggleRight}></div> :  <div className={styles.ToggleLeft}></div>}
                </div>
              </div>
            </div>
            <div className={styles.Buttons}>
              <button className={styles.Login} type="button" onClick={() => {submit.handleButtonClick(true), handleLogin()}}> Iniciar Sesión </button>
              <button className={styles.Register} style={{cursor:"pointer"}}onClick={() => {submit.handleButtonClick(false), navigate("/registro")}}>No tienes cuenta? Registrate aqui </button>
            </div>
            <div className={styles.Option}>
                <p id={styles.p} style={{fontSize: "14px", textAlign:"center"}}>Tambien</p>
            </div>
            <div className={styles.Google}>
              <button type="button" className={styles.GoogleButton} onClick={() => {handleGoogleLogin()}}>Inicia Sesion con Google </button>
            </div>
          </div>
        </form>
        {popUp && <ErrorLogin/>}
      </div>
      <img className={styles.Inicio} alt="Inicio" src="https://www.unimet.edu.ve/wp-content/uploads/2023/12/FOTOS-CAMPUS-2023-24-1-1024x683.jpg" />       
    </div>
  )
}

export default Login
