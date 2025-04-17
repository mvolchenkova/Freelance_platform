import './Proposal.css'
import Header from "../../compCustomer/Header/Header"
import { useEffect, useState } from 'react'
import Button from '../../materialuiComponents/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSkills } from '../../store/Slices/skillsSlicer';
import MultipleSelectChip from '../../materialuiComponents/chipSelect';
import { createProposal } from '../../store/Slices/proposalSlicer';
export default function Proposal(){
    const [title, setjobname] = useState('')
    const [cost, setCost] = useState(0);
    const [description, setDescription] = useState('');
    const [selectedSkills, setSelecetedSkills] = useState('');
    const [isPublished, setRadio] = useState(true);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.user.id;
   
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchSkills());
    },[dispatch])
    const navigate = useNavigate();
    const {status,error, skills} = useSelector((state) => state.skills);
    const handleSetJob = (e) =>{
        setjobname( e.target.value);
    }
    
    const handleSetConst = (e) =>{
        setCost(e.target.value)
    }
    const handleSetDesctiption = (e) =>{
        setDescription(e.target.value)
    }
    const handleSetRadio = () =>{
        setRadio(!isPublished);
    }
    const handleCreateProposal = (id,title,description,cost,isPublished,selectedSkills) =>{
        const skills = selectedSkills.toString();
        const resultAction = dispatch(createProposal(
           { id,title,description,cost,isPublished,skills}
        ),
        );
        if(resultAction.status === 500){
            alert(error.message);
        }
        navigate('/profile');
    }
    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'rejected') return <p>Error: {error}</p>;
    return(
        <>
        <Header/>
        <main className="main-proposal">
            <p className='ReadexFont title-proposal'>Lets create your job</p>
            <article className='create-form'>
                <div className="inputs proposal">
                    <div>
                        <label className='ReadexFont' htmlFor="job-title">Enter title of job</label>
                        <input
                            className="input-form proposal-input"
                            type="text"
                            id='job-title'
                            required
                            placeholder="Enter job title"
                            onChange={handleSetJob}
                            value={title}
                        />
                    </div>
                    <div>
                    <label className='ReadexFont' htmlFor="cost">Enter cost</label>
                        <input
                            className="input-form proposal-input"
                            type="text"
                            id='cost'
                            required
                            placeholder="Enter cost"
                            onChange={handleSetConst}
                            value={cost}
                        />
                    </div>
                    <div>
                        <MultipleSelectChip setSelecetedSkills={setSelecetedSkills}
                         skills={skills}/>
                    </div>
                   <div>
                    <label htmlFor="describe" className='ReadexFont'>Describle job</label>
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
                    <Button text="Create proposal"
                        color="rgb(127,135,100)"
                        backgroundColor="rgb(255,255,255)"
                        width="100%"
                        func={() =>handleCreateProposal(id,title,description,cost,isPublished,selectedSkills)}/>
                </div>
                
            </article>
        </main>
        </>
        
    )
}