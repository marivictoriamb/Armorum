import {createBrowserRouter} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import App from "./App.jsx"
import Landing from "./pages/Landing.jsx";
import Profile from "./pages/Profile.jsx";
import ClubProfile from "./pages/ClubProfile.jsx";
import Search from "./pages/Search.jsx";
import Agrupations from "./pages/Agrupations.jsx";
import Categories from "./pages/Categories.jsx";
import AgrupProfile from "./pages/AgrupProfile.jsx";
import CategoryProfile from "./pages/CategoryProfile.jsx";

export const router = createBrowserRouter([
    {path: "/inicio",
     element: <Login/>},
     {path: "/registro",
     element: <Register/>},
     {path: "/landing",
     element: <Landing/>},
     {path: "",
     element: <App/>},
     {path: "/perfil",
     element: <Profile/>},
     {path: "/landing/:name",
     element: <ClubProfile  />},
     {path: "/buscador",
     element: <Search  />},
     {path: "/agrupaciones",
     element: <Agrupations  />},
     {path: "/agrupaciones/:name",
     element: <AgrupProfile  />},
     {path: "/categorias",
     element: <Categories  />},
     {path: "/categorias/:name",
     element: <CategoryProfile  />}
]);
