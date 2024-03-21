import { db } from "../firebase.js"
import { collection, getDocs, query, where, getDoc, doc, updateDoc, addDoc, deleteDoc, orderBy, startAfter} from "firebase/firestore"
import { getUserId } from "./auth.js";



export async  function getCategories(){
    const clubsCollections = collection(db, "categories");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); // Data nos dara la informacion, name y description 

    return clubs;
}

export async  function getCategoriesId(){
    const clubsCollections = collection(db, "categories");
    const clubsSnapshot = await getDocs(clubsCollections);
    const clubs = clubsSnapshot.docs.map((doc) => doc.id); // Data nos dara la informacion, name y description 

    return clubs;
}

export async function getCategoriesByName(id){ //getClub
    const clubsCollections = collection(db, "categories");
    const clubsQuery = query(clubsCollections, where("name", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 
    return clubs;
}

export async function getCategoriesByName2(id){ //getClub
    const clubsCollections = collection(db, "categories");
    const clubsQuery = query(clubsCollections, orderBy('name'), startAfter(null));
    const clubsSnapshot = await getDocs(clubsQuery);
    const clubs = clubsSnapshot.docs.map((doc) => doc.data()); 

    return ([...clubs.filter((doc) => doc.name.toLowerCase().startsWith(id.toLowerCase()))]);
}

export async function getCategoryId(id){
    const clubsCollections = collection(db, "categories");
    const clubsQuery = query(clubsCollections, where("name", "==", id));
    const clubsSnapshot = await getDocs(clubsQuery);

    return clubsSnapshot.docs[0].ref.path.split("/")[1];
}

export async function getCategoryById(id){
    const clubRef = doc(db, "categories", id);
    const clubSnapshot = await getDoc(clubRef);

    return clubSnapshot.data(); // Aqui tienes el objeto club, para acceder a su nombre es objeto.nombre (nombre porque asi esta definido en la base de datos)
}

export async function getCategoryByIdName(id){
    const clubRef = doc(db, "categories", id);
    const clubSnapshot = await getDoc(clubRef);

    return clubSnapshot.data().name; // Aqui tienes el objeto club, para acceder a su nombre es objeto.nombre (nombre porque asi esta definido en la base de datos)
}

export async function updateCategoryData(id, name, agrupations){
    const usersCollection = collection(db, "categories");
    await updateDoc(doc(usersCollection, id), {
        name:name, agrupations:agrupations})
}

export async function createCategory(name){
    const agrupationCollection = collection(db, "categories");
    const data = {
        name:name,
        agrupations:[]};
    await addDoc(agrupationCollection, data);
}

export async function deleteCategory(id){
    const agrupationCollection = collection(db, "categories");
    const agrupationQuery = query(agrupationCollection, where("name", "==", id));
    const agrupationsSnapshot = await getDocs(agrupationQuery);

    const ref = id;
    await deleteDoc(doc(agrupationCollection, ref));
}
