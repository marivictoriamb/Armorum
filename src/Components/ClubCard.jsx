import { useNavigate } from "react-router-dom";
import styles from './ClubCard.module.css'
import { useEffect, useState } from "react";
import { getCategoryById, getCategoryByIdName } from "../controllers/categories";
import { useUser } from "../hooks/user";

function ClubCard({name, description, category, suscrito, button, handle}){    
    const yes = "/yes.png";
    const nou = "/no.png";
    const si = "Suscrito";
    const no = "No Suscrito";
    const [c, setC] = useState("")
    const navigate = useNavigate();
    const user = useUser();

    function ask1(){
        if (suscrito == true){
            return yes;
        } else{
            return nou;
        }
    }

    function ask2(){
        if (suscrito == true){
            return si;
        } else{
            return no;
        }
    }

    const handleClick = () => {
        navigate(`/landing/${name}`);
      };

      useEffect(() => {
        async function fetchData() {
            const ca = await getCategoryByIdName(category);
            setC(ca)
        };
    
        fetchData();
      }, [user]);



    return(
        <div className={styles.All} >
            <div className={styles.Card}>
                <div className={styles.banner}>
                    <div className={styles.Controler} onClick={handleClick} style={{cursor:"pointer"}}>
                        <div className={styles.Image}>
                            <img style={{width: "20vh", height:"20vh", objectFit:"contain", borderRadius:"50%"}} alt="control" src="/panda.png" />
                        </div>
                    </div>
                </div>
                
                <div className={styles.menu}>
                    <h2 className={styles.Name}>{name}</h2>
                    <div className={styles.Gender}>{ask2(   )}<img alt="suscrito" src={ask1()} style={{width: "30px", height:"30px"}}/></div>
                    <div className={styles.Description}>{description}</div>
                    <div className={styles.Category}>{c}</div>
                    {(button==true) ? (<button className={styles.Des}  onClick={() => {handle(name)}}> Desafiliarse </button>) : "" }
                </div>
            </div>
        </div>
    )
}
export default ClubCard;