import { getCategoryById, updateCategoryData } from "../controllers/categories";
import { createClub, getClubId } from "../controllers/clubs";

export function create(categoryId, number, contact, categories, founder, members, mision, name, objectives, vision, year, navigate){

    async function handle(){
        let cname = categoryId;
        const n = number+contact;
        if (categoryId == ""){
            cname = await categories.id[0]
        }
        await createClub(cname, n, founder, members, mision, name, objectives, "", "", vision, year);
        const c = await getCategoryById(cname)
        const id = await getClubId(name)
        const newC = c.agrupations;
        newC.push(id)
        await updateCategoryData(cname, c.name, newC)
        navigate(`/agrupaciones/${name}`);
    }

    handle() 
     
}
