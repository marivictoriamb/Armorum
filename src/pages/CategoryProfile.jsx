import { useEffect, useState } from 'react';
import { useCategories } from '../controllers/api';
import styles from '../css/Profile.module.css'
import { useUser } from '../hooks/user';
import { getClubById, getClubId, getClubsByName, updateClubData } from '../controllers/clubs';
import { getCategoriesByName, getCategoryById, getCategoryId, updateCategoryData } from '../controllers/categories';
import { useParams } from 'react-router-dom';
import CardLoader from '../Components/CardLoader';
import Actualizacion from '../Components/Actualizacion';
import QuestionC from "../Components/QuestionC";
import QuestionCD from "../Components/QuestionCD";
import { getUserById } from '../controllers/auth';
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import Loader from '../Components/Loader.jsx';

export default function CategoryProfile(){
    const categoryName = useParams();
    const user = useUser();
    const [category, setCategory] = useState(null)
    const [name, setName] = useState(""); //
    const [categoryId, setCategoryId] = useState("");
    const [members, setMembers] = useState([])
    const [membersN, setMembersN] = useState([])
    
    const [trigger, setTrigger] = useState(false);
    const [act, setAct] = useState(false);
    const [trigger2, setTrigger2] = useState(false);
    const [act2, setAct2] = useState(false);
    const [done, setDone] = useState(false); 

    const [error, setError] = useState(false);
    const [type, setType] = useState("");

    
    async function fetchClubData() {
        const categoryData = await getCategoriesByName(categoryName.name);
        setCategory(categoryData);
        setName(categoryData[0].name)
        setMembers(categoryData[0].agrupations)
        const member = await Promise.all(
            categoryData[0].agrupations.map(async (item) => {
                return await getClubById(item);
                })
            );
        setMembersN(member);

        if (categoryId == ""){
            const c = await getCategoryId(categoryName.name);
            setCategoryId(c)
        }

        setDone(true);
        
    }

  useEffect(() => {
    async function fetchData() {
      if (user != null){
        await fetchClubData()
      }
    };

    fetchData();
  }, [user]);

    async function handle(){
        setDone(false);
        await updateCategoryData(categoryId, name, members);
        await restoreData()
    }

    async function restoreData(){
        setError(false)
        setName(name);       
        setDone(true);
    }

    async function handleDelete(){
        if (members.length == 0){
            setAct2(false);
            setTrigger2(true);
        } else {
            setError(true);
            setType('La categoria cuenta con agrupaciones');
        }
    }

    return(
        <div>
        {(done==false)?(
             <div
             style={{
               width:"100vw",
               overflow:"hidden"
             }}
           >
             <Loader />
           </div>
        ) : (
        <div>
        {act && <Actualizacion/>}
        {error && <ErrorUpdate key={categoryId} error={type}/>}
        <div className={styles.Create}>
                <label> Nombre:<input className={styles.Input} value={name} onChange={(e) => setName(e.target.value)}/></label>
                <button onClick={() => {setAct(false), setTrigger(true)}}>Actualizar</button>
                <button onClick={() => {handleDelete()}}>Eliminar</button>
                {(done==false)?(
                            <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
                                <CardLoader/>
                                <CardLoader/>
                                <CardLoader/>
                            </div>
                        ) : (
                            (
                            membersN.map((member, index) => (
                                <div> 
                                    <div> Nombre: {member.name} </div>
                                </div>
                            )))
                        )}
            </div>
            <QuestionC trigger={trigger} category={categoryId} agrupations={members} name={name} setTrigger={setTrigger} restoreData={ restoreData} setAct={setAct} />
            <QuestionCD trigger={trigger2} id={categoryId} setTrigger2={setTrigger2} />
        </div> )}
        </div>
        
    )
}