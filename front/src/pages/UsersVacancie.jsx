import { useDispatch, useSelector } from "react-redux";
import Header from "../compCustomer/Header/Header";
import SearchBar from "../compCustomer/SearchBar/SearchBar";
import { useEffect } from "react";
import { deleleteVacancie, fetchByUserIdVacancie, removeVacancie } from "../store/Slices/vacancieSlicer";
import { publishVacancie } from "../store/Slices/vacancieSlicer";
import Button from '../materialuiComponents/Button'
import Vacancie from "../compCustomer/vancie";
import { Link } from "react-router-dom";
export default function UsersVacancie(){
    const {vacancies,status} = useSelector((state) => state.vacancie)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchByUserIdVacancie())
    },[dispatch])

    const handleDelete = (idVacancie) =>{
        dispatch(deleleteVacancie(idVacancie))
        dispatch(removeVacancie(idVacancie))
    }
    const handleUpdate = (idVacancie, isPublished) =>{
        console.log(idVacancie)
        dispatch(publishVacancie({ idVacancie, isPublished})).then(() => {
            dispatch(fetchByUserIdVacancie());
        });
    }
    if(status === 'loading') return <p>loading</p>
    return(
        <>
            <Header/>
            <main className='main-all-proposal'>
                <p className='ReadexFont title-page'>Your vacancies</p>
                {vacancies.length !== 0 ? (
                        <div className="article-tasks">
                            <SearchBar/>
                            {vacancies.map((vacancie) =>(
                                <Vacancie key={vacancie.idVacancie} handleUpdate={handleUpdate} handledelete={handleDelete} task={vacancie}/>
                            ))}      
                        </div>
                           
                        ):(
                            <div className='condition-else'>
                            <p className='ReadexFont warning-proposal'>You dont create any vacancie. Do you want to create it?</p>
                            <Link to ='/createVacancie'>
                                <Button
                                    className="ReadexFont"
                                    text="Create a vacancie"
                                    backgroundColor="rgb(255, 255, 255)"
                                    color="#000"
                                    fontSize="16px"
                                    width="200px"
                                />
                            </Link>
                            </div>
                            
                        )}
            </main>
        </>
        
    )
}