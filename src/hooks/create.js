import { getCategoryById, updateCategoryData } from "../controllers/categories";
import { createClub, getClubId, updateClubData } from "../controllers/clubs";
import { uploadImagen, uploadImages } from "../controllers/files";

export function create(categoryId, number, contact, categories, members, mision, name, objectives, photos, vision, year, navigate){

    async function handle(){
        let cname = categoryId;
        const n = number+contact;
        if (categoryId == ""){
            cname = await categories.id[0]
        }

        

        await createClub(cname, n, members, mision, name, objectives, [], vision, year);


        let img = [];
        const ident = await getClubId(name);
        if (photos.length != 0){
            for (let i = 0; i < photos.length; i ++){
                const result = await uploadImages(photos[i], ident);

                img.push(result);
           }
        }

        await updateClubData(cname, n, ident, members, mision, name, objectives, img, vision, year)

        const c = await getCategoryById(cname)
        const id = await getClubId(name)
        const newC = c.agrupations;
        newC.push(id)
        await updateCategoryData(cname, c.name, newC)
        navigate(`/agrupaciones/${name}`);
    
    }

    handle() 
     
}
