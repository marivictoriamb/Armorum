import { useEffect, useState } from "react";
import { getClubs, getClubsByCategory, getClubsByName, getClubsId } from "./clubs";
import { getCategories, getCategoriesByName, getCategoriesByName2, getCategoriesId, getCategoryById, getCategoryByIdName, getCategoryId } from "./categories";

export function useClubs(){
    const [data, setData] = useState(null);
    const [id, setId] = useState(null)

    useEffect(() => {
        async function cargarDatos(){
            const clubs = await getClubs();
            setData(clubs);
            const ids = await getClubsId();
            setId(ids);
        }

        cargarDatos();
    }, [])

    const isLoading = data == null;
    const isCharging = id == null;

    return {data, isLoading, id, isCharging};
}


export function useClub(name, type){
    const [data, setData] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        async function cargarDatos(){
            if (type == "Nombre"){
                const clubs = await getClubsByName(name);
                setData(clubs);
                const ids = await getClubsId();
                setId(ids);
            } else if (type == "Categoria") {
                const category = await getCategoriesByName2(name)
                try{
                    const i = await getCategoryId(category[0].name)
                    const clubs = await getClubsByCategory(i);
                    setData(clubs);
                    const ids = await getClubsId();
                    setId(ids);
                } catch (e) {
                    setId("no")
                    setData([])
                }
                
            } else {
                setId("no")
                setData([])
            }
        
        }

        cargarDatos();
    }, [name])

    const isLoading = data == null;
    const isCharging = id == null;

    return {data, isLoading,  id, isCharging};
}

export function useCategories(){
    const [data, setData] = useState(null);
    const [id, setId] = useState(null)

    useEffect(() => {
        async function cargarDatos(){
            const clubs = await getCategories();
            setData(clubs);
            const ids = await getCategoriesId();
            setId(ids);
        }

        cargarDatos();
    }, [])

    const isLoading = data == null;
    const isCharging = id == null;

    return {data, isLoading, id, isCharging};
}
