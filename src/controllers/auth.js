import { getAdditionalUserInfo, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc, collection, addDoc, getDocs, query, where, updateDoc, getDoc } from "firebase/firestore";
import { auth, googleProvider } from "../firebase.js";
import { db } from "../firebase.js"

export async function signUpGoogle(){
    try{
        const result = await signInWithPopup(auth, googleProvider);


        const adittionalInfo = getAdditionalUserInfo(result); 

        if(adittionalInfo.isNewUser==true){
            let number = result.user.phoneNumber
            if (number == null){
                number = "04120000000"
            }
            await addDoc(collection(db, "users"), {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                userRole: "1",
                number: number,
                image: result.user.photoURL,
                carrer: "",
                agrupations: [],
              });
        }
        

        return result.user;
        
    } catch (error){
        console.error(error);
    }
  }


  export async function signInGoogle(admin){
    try{
        const result = await signInWithPopup(auth, googleProvider);

        const adittionalInfo = getAdditionalUserInfo(result); 

        if(adittionalInfo.isNewUser){
            number = result.user.phoneNumber
            if (number == null){
                number = "04120000000"
            }
            await addDoc(collection(db, "users"), {
                id: result.user.uid,
                name: result.user.displayName,
                email: result.user.email,
                userRole: "1",
                number: number,
                image: result.user.photoURL,
                carrer: "",
                agrupations: [],
              });
        } 
        return result.user;
        
    } catch (error){
        console.error(error);
    }
  }


export async function logOut(){
    try{
        await signOut(auth);
        // Al usar esta funcion setear al usuario a NULL
    } catch (error){
        console.error(error);
    }   
}


export async function loginWithCredentials(email, password, admin){
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function registerWithCredentials(name, email, password, number, carrer){
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        await createUserData(user.uid,name, email, number, carrer)
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createUserData (id, name, email, number, carrer){
    await addDoc(collection(db, "users"), {
        id: id,
        name: name,
        email: email,
        userRole: "1",
        number: number,
        image: "imagenes/user.png",
        carrer: carrer,
        agrupations: [],
      });
}


export async function getUserData(email){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    const users = userSnapshot.docs.map((doc) => doc.data()); 
    return users[0];
}

export async function getUserId(email){
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("email", "==", email));
    const userSnapshot = await getDocs(userQuery);
    return userSnapshot.docs[0].ref.path.split("/")[1];
}

export async function getUserById(id){
    const userRef = doc(db, "users", id);
    const userSnapshot = await getDoc(userRef);

    return userSnapshot.data(); // Aqui tienes el objeto club, para acceder a su nombre es objeto.nombre (nombre porque asi esta definido en la base de datos)
}



export async function updateUserData(name, email, userRole, number, carrer, img, agrups){
    const usersCollection = collection(db, "users");
    const ref = await getUserId(email);
    await updateDoc(doc(usersCollection, ref), {
        name: name,
        email: email,
        userRole: userRole,
        number: number,
        image: img,
        carrer: carrer,
        agrupations: agrups,})
}
