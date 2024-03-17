import { Link, useNavigate } from "react-router-dom"
import Login from "./pages/Login";

function App(){
    const navigate = useNavigate();

    return (
        <div className="Btns">
            <Login></Login>
        </div>
    )
} 
export default App
