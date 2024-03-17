import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useState, useEffect} from "react";
import { UserContext } from '../hooks/user.js';


export function UserProvider({children}){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        setUser(user);
        });
    }, [])

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
