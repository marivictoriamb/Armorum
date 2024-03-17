import { db } from "../firebase.js"
import { collection, getDocs, query, where, getDoc, doc, updateDoc, addDoc, deleteDoc} from "firebase/firestore"
import { getUserId } from "./auth.js";



export async  function getClubs(){
    const clubsCollections = collection(db, "agrupations");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return clubs;
}

export async  function getClubsId(){
    const clubsCollections = collection(db, "agrupations");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.id); // Data nos dara la informacion, name y description 

    return clubs;
}

export async function getClubsByName(id){ //getClub
    const clubsCollections = collection(db, "agrupations");
    const clubsQuery = query(clubsCollections, where("name", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 
    return clubs;
}

export async function getClubsByCategory(id){ 
    const clubsCollections = collection(db, "agrupations");
    const clubsQuery = query(clubsCollections, where("category", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 
    return clubs;
}

export async function getClubId(id){
    const clubsCollections = collection(db, "agrupations");
    const clubsQuery = query(clubsCollections, where("name", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);

    return clubsSnapshot.docs[0].ref.path.split("/")[1];
}

export async function getClubById(id){
    const clubRef = doc(db, "agrupations", id);
    const clubSnapshot = await getDoc(clubRef);

    return clubSnapshot.data(); // Aqui tienes el objeto club, para acceder a su nombre es objeto.nombre (nombre porque asi esta definido en la base de datos)
}


export async function updateClubData(category, contact, founder, id, members, mision, name, objectives, photofounder, photos, vision, year){
    const usersCollection = collection(db, "agrupations");
    const ref = id;
    await updateDoc(doc(usersCollection, ref), {
        year: year,
        vision: vision,
        photos:photos,
        photofounder: photofounder,
        objectives:objectives,
        name:name,
        mision:mision,
        members:members,
        id: id,
        founder: founder,
        contact:contact,
        category:category})
}

export async function createClub (category, contact, founder, members, mision, name, objectives, photofounder, photos, vision, year){
    const agrupationCollection = collection(db, "agrupations");
    const data = {year: year,
        vision: vision,
        photos:photos,
        photofounder: photofounder,
        objectives:objectives,
        name:name,
        mision:mision,
        members:members,
        id: "",
        founder: founder,
        contact:contact,
        category:category};
    await addDoc(agrupationCollection, data);

    const id = await getClubId(name);
    updateClubData(category, contact, founder, id, members, mision, name, objectives, photofounder, photos, vision, year)
}

export async function deleteClub(id){
    const agrupationCollection = collection(db, "agrupations");
    const agrupationQuery = query(agrupationCollection, where("id", "==", id));
    const agrupationsSnapshot = await getDocs(agrupationQuery);

    const ref = id;
    await deleteDoc(doc(agrupationCollection, ref));
}
