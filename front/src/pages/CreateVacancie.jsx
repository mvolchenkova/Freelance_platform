import { useEffect, useState } from "react";
import Header from "../compCustomer/Header/Header";
import MultipleSelectChip from "../materialuiComponents/chipSelect";
import  Button  from "../materialuiComponents/Button"
import { useDispatch, useSelector } from "react-redux";
import { fetchSkills } from "../store/Slices/skillsSlicer";
import { createVacancie } from "../store/Slices/vacancieSlicer";
import { useNavigate } from "react-router-dom";
export default function CreateVacancie(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [vacancie, setVacanciename] = useState('')
    const [salary, setSalary] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedSkills, setSelecetedSkills] = useState('');
    const {error, skills} = useSelector((state) => state.skills);
    const [isPublished, setIsPublished] = useState(false)
    useEffect(()=>{
        dispatch(fetchSkills());
    },[dispatch])
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.user.id;
    const handleSetTitleVacancie = (e) =>{
        setVacanciename( e.target.value);
    }
    
    const handleSetSalary = (e) =>{
        setSalary(e.target.value)
    }
    const handleSetDesctiption = (e) =>{
        setDescription(e.target.value)
    }
    const handleSetRadio= () =>{
        setIsPublished(!isPublished);
    }
    const handleCreateVacancie = (id,title,description,salary,isPublished,selectedSkills) =>{
        const skills = selectedSkills.toString();
        const resultAction = dispatch(createVacancie(
           { id,title,description,salary,isPublished,skills}
        ),
        );
        if(resultAction.status === 500){
            alert(error.message);
        }
        navigate('/profile');
    }
    return(
            <>
            <Header/>
            <main className="main-proposal">
                <p className='ReadexFont title-proposal'>Lets create your job</p>
                <article className='create-form'>
                    <div className="inputs proposal">
                        <div>
                            <label className='ReadexFont' htmlFor="job-title">Enter vacancie title</label>
                            <input
                                className="input-form proposal-input"
                                type="text"
                                id='vacancie-title'
                                required
                                placeholder="Enter vacancie title"
                                onChange={handleSetTitleVacancie}
                                value={vacancie}
                            />
                        </div>
                        <div>
                        <label className='ReadexFont' htmlFor="cost">Enter salary per month</label>
                            <input
                                className="input-form proposal-input"
                                type="text"
                                id='salary'
                                required
                                placeholder="Enter salary"
                                onChange={handleSetSalary}
                                value={salary}
                            />
                        </div>
                        <div>
                            <MultipleSelectChip setSelecetedSkills={setSelecetedSkills}
                             skills={skills}/>
                        </div>
                       <div>
                        <label htmlFor="describe" className='ReadexFont'>Describle vacancie</label>
                        <textarea
                            className="input-form text-area"
                            type="text"
                            id='describe'
                            placeholder="Describe task"
                            required
                            onChange={handleSetDesctiption}
                            value={description}
                            />
                       </div>
                       
                    </div>
                    <div className='choice-proposal'>
                        
                        <label htmlFor="publish" className='ReadexFont label'>Publish now?
                            <input type='checkbox' id='publish' value={isPublished} onChange={handleSetRadio}/>
                        </label>
                        <Button text="Create vacancie"
                            color="rgb(127,135,100)"
                            backgroundColor="rgb(255,255,255)"
                            width="100%"
                            func={() =>handleCreateVacancie(id,vacancie,description,salary,isPublished,selectedSkills)}/>
                    </div>
                    
                </article>
            </main>
            </>
            
        )
}