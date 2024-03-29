import { useEffect, useState } from 'react';
import { useCategories } from '../controllers/api';
import styles from '../css/AgrupProfile.module.css'
import { useUser } from '../hooks/user';
import { getClubId, getClubsByName, getClubsByName2, updateClubData } from '../controllers/clubs';
import { getCategoryById, getCategoryId, updateCategoryData } from '../controllers/categories';
import { useParams } from 'react-router-dom';
import CardLoader from '../Components/CardLoader';
import Actualizacion from '../Components/Actualizacion';
import QuestionA from "../Components/QuestionA";
import QuestionAD from "../Components/QuestionAD";
import { getUserById } from '../controllers/auth';
import ErrorUpdate from "../Components/ErrorUpdate.jsx";
import Loader from '../Components/Loader.jsx';
import AdminHeader from "../Components/AdminHeader.jsx";
import Sidebar from "../Components/SideBar.jsx";
import FooterUsuario from "../Components/FooterUsuario.jsx";
import noimage from "/noimage.jpeg";
import { Carrusel } from "../Components/Carrusel.jsx";
import GameCard from "../Components/GameCard.jsx";
import { deletePhoto, getImageUrl, uploadImages } from '../controllers/files.js';
import PhotosContainer from '../Components/PhotosContainer.jsx';



export default function AgrupProfile(){
    const [original, setOriginal] = useState("")
    const [category, setCategory] = useState(""); //
    const [contact, setContact] = useState(""); //
    const [members, setMembers] = useState([]); //
    const [membersN, setMembersN] = useState([]); //
    const [membersI, setMembersI] = useState([]);
    const [mision, setMision] = useState(""); //
    const [name, setName] = useState(""); //
    const [objectives, setObjectives] = useState("");//
    const [vision, setVision] = useState(""); //
    const [year, setYear] = useState(""); //
    const [id, setId] = useState(""); //
    const categories = useCategories();
    const [categoryId, setCategoryId] = useState("");
    const [prevCategoryId, setPrevCategoryId] = useState("");

    const clubName = useParams();
    const user = useUser();
    const [club, setClub] = useState(null);
    const [trigger, setTrigger] = useState(false);
    const [act, setAct] = useState(false);
    const [trigger2, setTrigger2] = useState(false);
    const [act2, setAct2] = useState(false);
    const [done, setDone] = useState(false); 

    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const [is, setIs] = useState(true);

    const [error, setError] = useState(false);
    const [type, setType] = useState("");

    const startYear = 2000;
    const endYear = new Date().getFullYear();

    
    async function fetchClubData() {
        const clubData = await getClubsByName2(clubName.name);
        setClub(clubData);

        if (clubData[0].members.length != 0){
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
        setMembersN(membersN);

        const membersIm = await Promise.all(
            membersData.map(async (item) => {
                return await getImageUrl(item.image);
            })
            );
        setMembersI(membersIm)
        }


        if (clubData[0].photos.length != 0){
            setImage(clubData[0].photos)
            const images = await Promise.all(
                clubData[0].photos.map(async (item) => {
                    return await getImageUrl(item);
                })
            );
            setImageUrl(images)
        } else {
            setImage([`agrupaciones/noimage.jpeg`])
            const result = await getImageUrl(`agrupaciones/noimage.jpeg`)
            setImageUrl([result])
        }

        

        const c = await getCategoryById(clubData[0].category);
        setCategory(c.name)
        setCategoryId(clubData[0].category)
        setPrevCategoryId(clubData[0].category)
        setContact(clubData[0].contact);
        setContact(clubData[0].contact);
        setMembers(clubData[0].members)
        setMision(clubData[0].mision);
        setName(clubData[0].name);
        setOriginal(clubData[0].name);
        setObjectives(clubData[0].objectives);
        setVision(clubData[0].vision);
        setYear(clubData[0].year);
        setId(clubData[0].id);

    }

  useEffect(() => {
    async function fetchData() {
      if (user != null){
        await fetchClubData()
        setDone(true);
      }
    };

    fetchData();
  }, [user]);



    async function restoreData(){
        setError(false)
        await fetchClubData();
        
        setDone(true);
    }

    async function handleCategory(c){
        const cat = await getCategoryId(c);
        setCategoryId(cat)
    }

    async function handleDelete(){
        if (members.length == 0){
            setAct2(false);
            setTrigger2(true);
        } else {
            setError(true);
            setType('La agrupacion cuenta con miembros');
        }
    }

    async function handlePhoto(file) {
        setIs(false);
        if (file[0] != undefined) {
            let img = [];
            if (image[0] != `agrupaciones/noimage.jpeg`){
                    img = image
            }

            let imagesUrl = [];
            const imgDefault = await getImageUrl(`agrupaciones/noimage.jpeg`);
            if (imageUrl[0] != imgDefault){
                imagesUrl = imageUrl;
            }

           for (let i = 0; i < file.length; i ++){
                const result = await uploadImages(file[i], id);

                img.push(result);

                const url = await getImageUrl(result);

                imagesUrl.push(url)
           }
           setImage(img)
           setImageUrl(imagesUrl)
          
           await updateClubData(categoryId, contact, id, members, mision, name, objectives, img, vision, year);
          setIs(true);
        }
      }

      async function handleElimination(img, url){
        setIs(false);
            deletePhoto(img);
        let images = image.filter(
            (item) => item !== img
          );
    
          let urls = imageUrl.filter(
            (item) => item !== url
          );

          if (images.length == 0){
            images = [`agrupaciones/noimage.jpeg`];
            const result = await getImageUrl(`agrupaciones/noimage.jpeg`)
            urls = [result];
          }
        setImage(images);
        setImageUrl(urls);
        await updateClubData(categoryId, contact, id, members, mision, name, objectives, images, vision, year);
        setIs(true);
      }



      async function handleSubmit(e){
        e.preventDefault();
        if (/^(0412|0414|0424|0416)\d{7}$/.test(contact) == true){
            
            const result = await getClubsByName(name);
            if (result.length != 0){
                if ((result[0].name.toLowerCase() == original.toLocaleLowerCase())){
                    setTrigger(true);
                }else if (result[0].name.toLowerCase() != name.toLowerCase()){
                    setTrigger(true);
                }else{setType('Ya existe una categoria con dicho nombre')
                    setError(true);
                }
                
            }else{
                setTrigger(true);
            }
        } else {
            setType('Introduzca un numero valido')
            setError(true);
        }
      }

    return(
        <Sidebar>
            <div>
                <div className={styles.All} >
                <AdminHeader></AdminHeader>
                <div className={styles.div1}>
                    <div style={{ display: 'flex', flexWrap:"wrap"}}>
                    {(done==false)?(
                         <div
                         style={{
                           width:"100vw",
                           overflow:"hidden"
                         }}
                       >
                         <Loader />
                       </div>
                    ) : (
                        <div style={{width:"100%"}}>
                        <div style={{ flex: 1, paddingRight: '20px', display: 'flex', justifyContent:"space-between"}}>
                        <h1 contentEditable="true" onBlur={(e) => setName(e.target.innerText)}>{name}</h1>
                        </div>
                        <div style={{ flex: 1, borderTop:"solid orange", marginTop:"30px"}}>
                            <h2>Información</h2>
                        {act && <Actualizacion/>}
                        {error && <ErrorUpdate key={type} error={type}/>}
                        <form className={styles.Create} style={{width:"100%", flex: 1, paddingRight: '20px', display: 'flex', justifyContent:"space-between"}} onSubmit={handleSubmit}>
                        <div className={styles.botones}>
                        <button className={styles.boton} type="submit">Actualizar</button>
                        <button className={styles.boton} onClick={() => {handleDelete()}}>Eliminar</button>
                        </div>
                        <div className={styles.textContainer}> 
                        <label> Nombre</label>
                        <input required={true} value={name} className={styles.TextArea} onChange={(e) => {setName(e.target.value), setError(false)}}/>
                        </div>
                        <div className={styles.textContainer}>
                        <label htmlFor="mision">Misión</label>
                        <input required id="mision" className={styles.TextArea} value={mision} onChange={(e) => {setMision(e.target.value), setError(false)}}></input>
                        </div>
                        <div className={styles.textContainer}>
                        <label  htmlFor="vision">Visión</label>
                        <input required id="vision" className={styles.TextArea} value={vision} onChange={(e) => {setVision(e.target.value), setError(false)}}></input>
                        </div>
                        <div className={styles.textContainer}>
                        <label htmlFor="objectives">Objetivos</label>
                        <input required id="objectives" className={styles.TextArea} value={objectives} onChange={(e) => {setObjectives(e.target.value), setError(false)}}></input>
                        </div>
                        <div className={styles.textContainer}>
                        <label htmlFor="contact">Contacto</label>
                        <input required id="contact" className={styles.TextArea} value={contact} onChange={(e) => {setContact(e.target.value), setError(false)}}></input>
                        </div>
                        <div className={styles.textContainer}>
                        <label> Año de Creacion:</label>
                            <select className={styles.select} required value={year} onChange={(e) => {setYear(e.target.value), setError(false)}} id="year" name="year">
                        {Array.from({ length: endYear - startYear + 1 }, (_, i) => (
                            <option key={i + startYear} value={startYear + i} className={styles.select}> {startYear + i} </option> ) ) }
                            </select>
                        </div>
                        <div className={styles.textContainer}>
                        <label >Categoria</label>
                        <select className={styles.select} style={{width:"50vw", maxWidth:"340px"}}value={category} name="Categoria" onChange={(e) => {handleCategory(e.target.value), setCategory(e.target.value), setError(false)}}>
                                        {categories.isLoading  ? (
                                            <option key={"loading"}> . . .</option>
                                        ) : (
                                            categories.data.map((category, id) => (<option className={styles.select} key={id} >{category.name}</option>
                                            ))
                                        )}
                                        </select>
                                </div>
                            </form>
                            <QuestionA trigger={trigger} prev={prevCategoryId} category={categoryId} contact={contact} id={id} members={members} mision={mision} name={name} objectives={objectives} photos={image} vision={vision} year={year} setTrigger={setTrigger} restoreData={ restoreData} setAct={setAct} />
                            <QuestionAD trigger={trigger2} id={id} categoryId={categoryId} setTrigger2={setTrigger2} />
                        
                        </div> 
                        <div style={{display:"flex", flexDirection:"column", borderTop:"solid orange", marginTop:"30px"}}>
                        <h1>Imagenes</h1>
                        {is == false ? (
                            <Loader/>
                        ) : (
                            <div>
                        <div style={{ flex: 1, padding: '30px', display: 'flex', flexWrap:"wrap", flexDirection:"column", alignItems:"center"}}>
                            <PhotosContainer photos={image} photosUrl={imageUrl} handlePhoto={handlePhoto} handleElimination={handleElimination}/>
                        </div>
                        </div>
                        )}
                        </div>
                        </div>)}
                    </div>
                    {!done ? (
                        <div style={{ margin: "30px", display: "flex", flexWrap: "wrap", flexDirection: "row", gap: "5vw", alignItems: "center", justifyContent: "center" }}>
                            <CardLoader />
                            <CardLoader />
                            <CardLoader />
                        </div>
                    ) : (
                        <div style={{display:"flex", flexDirection:"column", borderTop:"solid orange", marginTop:"30px"}}>
                        <h1>Integrantes</h1>
                        <div className={styles.Members}>
                            {membersN.map((member, index) => (
                                <GameCard key={index} name={member} image={membersI[index]} />
                            ))}
                        </div>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </Sidebar>                
     )
}