import { useParams } from "react-router-dom";
import { getClubById, getClubId, getClubsByName, updateClubData } from "../controllers/clubs.js";
import { useState, useEffect } from "react";
import GameCard from "../Components/GameCard.jsx";
import styles from "../css/ClubsProfile.module.css";
import { getUserById, getUserData, getUserId, updateUserData } from "../controllers/auth.js";
import { useUser } from "../hooks/user";
import CardLoader from "../Components/CardLoader.jsx";
import Navbar from "../Components/NavbarUsuario.jsx";
import NavbarV from "../Components/NavbarVisitante.jsx";
import { getCategoryById } from "../controllers/categories.js";
import Loader from "../Components/Loader.jsx";

export default function ClubProfile() {
  const clubName = useParams();
  const user = useUser(); 
  const [done, setDone] = useState(false);

  const [club, setClub] = useState(null);
   const [members, setMembers] = useState([]);
   const [membersNames, setMembersNames] = useState([]);
   const [membersId, setMembersId] = useState([])
   const [category, setCategory] = useState([])
   const [show, setShow] = useState("...");
  const [want, setWant] = useState(false);
  const [visitor, IsVisitor] = useState(true);
 

  async function handleMembership(){
    if (show != "..."){
      setDone(false);

      const userData = await getUserData(user.email); 
      const membershipValue = userData.agrupations;
      if (want != true){
        membershipValue.push(club[0].id);
        await updateUserData(
          userData.name,
          userData.email,
          userData.userRole,
          userData.number,
          userData.carrer,
          userData.image,
          membershipValue
        );
        const id = await getUserId(user.email)
        membersId.push(id)
        membersNames.push(userData.name)
        await updateClubData(
          club[0].category,
          club[0].contact,
          club[0].founder,
          club[0].id,
          membersId,
          club[0].mision,
          club[0].name,
          club[0].objectives,
          club[0].photofounder,
          club[0].photos,
          club[0].vision,
          club[0].year
        );
        setShow("Desafiliarse");
      } else {
        const membershipValue = userData.agrupations.filter((item) => item !== club[0].id );
        const id = await getUserId(user.email);
        const newMembers = membersId.filter((member) => member !== id);
        setMembersId(newMembers);
        await updateUserData(
          userData.name,
          userData.email,
          userData.userRole,
          userData.number,
          userData.carrer,
          userData.image,
          membershipValue
        );
        await updateClubData(
          club[0].category,
          club[0].contact,
          club[0].founder,
          club[0].id,
          newMembers,
          club[0].mision,
          club[0].name,
          club[0].objectives,
          club[0].photofounder,
          club[0].photos,
          club[0].vision,
          club[0].year
        );
        if (club[0].members != []){
          const membersData = await Promise.all(
            newMembers.map(async (item) => {
              return await getUserById(item);
            })
          );

          const membersN = await Promise.all(
            newMembers.map(async (item) => {
               return await item.name;
             })
           );
        setMembersNames(membersN)
        setMembers(membersData);
        setShow("Afiliarse");
        }
      }
  
      setWant(!want);
      setDone(true);
    }
  };

  async function fetchClubData() {
    const clubData = await getClubsByName(clubName.name);
    setClub(clubData);

    if (clubData[0].members != []){
      const membersData = await Promise.all(
        clubData[0].members.map(async (item) => {
          return await getUserById(item);
        })
      );
      
      const membersN = await Promise.all(
       membersData.map(async (item) => {
          return await item.name;
        })
      );
      setMembers(membersData);
      setMembersId(clubData[0].members)
      setMembersNames(membersN)
    }
    

      if (user != null && clubData != null){
        const data = await getUserData(user.email);
        const clubValue = await getClubId(clubData[0].name);
        const membershipValue = data.agrupations;
        if (membershipValue.includes(clubValue) == true){
          setWant(true)
          setShow("Desafiliarse");
        } else {
          setWant(false)
          setShow("Afiliarse")
        }

        const c = await getCategoryById(clubData[0].category);
        setCategory(c.name);

        IsVisitor(false);
        setDone(true);
      }
  };

  async function fetchCData() {
    const clubData = await getClubsByName(clubName.name);
    setClub(clubData);

    if (clubData[0].members != []){
      const membersData = await Promise.all(
        clubData[0].members.map(async (item) => {
          return await getUserById(item);
        })
      );
      
      const membersN = await Promise.all(
       membersData.map(async (item) => {
          return await item.name;
        })
      );
      setMembers(membersData);
      setMembersId(clubData[0].members)
      setMembersNames(membersN)
    }

        const c = await getCategoryById(clubData[0].category);
        setCategory(c.name);

        setDone(true);
  };

  useEffect(() => {
    async function fetchData() {
      if (user != null){
        fetchClubData()
      } else {
        fetchCData();
      }
    };

    fetchData();
  }, [user]);

  return(
    <div>
    {(done==false)?(
      <div style={{margin:"30px", display:"flex", flexWrap:"wrap", flexDirection:"row", gap:"5vw", alignItems:"center", justifyContent:"center"}}>
        <Loader/>
      </div>
    ) : (
      <div className={styles.container}>
        <img className={styles.img}
          style={{ width: "40%", height: "100vh"}}
          alt="Metrotech"
          src={"/LogoMetrotech.png"}
        />
        <div className={styles.Right}>
        {visitor ? (
        <NavbarV></NavbarV>
      ): (
        <Navbar></Navbar>
      )}
          <div>
            <div className={styles.position}>
              <h1 className={styles.Name}> {club[0].name} </h1>
              <div className={styles.Text}>
                <div className={styles.info}>
                  <img className={styles.icon} alt="icon" src="/information.png" />
                  <h4 className={styles.Description}>{club[0].objectives}</h4>
                  <h4 className={styles.Description}>{category}</h4>
                </div>
              {visitor ? (""):(<button className={styles.Afiliacion} onClick={() => {handleMembership()}}>{show}</button>)}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.Members}>
              {membersNames.map((member) => (
                <GameCard key={member}
                member={member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )}
</div>
  )
}