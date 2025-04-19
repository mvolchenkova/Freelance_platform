import './UsersTasks.css'
import Header from '../../compCustomer/Header/Header'
import SearchBar from '../../compCustomer/SearchBar/SearchBar'
import { fetchProposalbyId,removeProposal,deleteProposal,publishProposal } from '../../store/Slices/proposalSlicer'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Task from '../../compCustomer/task'
import { Link } from 'react-router-dom'
import Button from '../../materialuiComponents/Button'
export default function UsersTasks(){
    const {proposal,status,error} = useSelector((state)=> state.proposal)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProposalbyId())
    },[dispatch])

    const handleDelete = (idProposal) => {
        dispatch(removeProposal(idProposal));
        dispatch(deleteProposal(idProposal));
    };

    const handleUpdate = (idProposal, isPublished) => {
        dispatch(publishProposal({ idProposal, isPublished })).then(() => {
          dispatch(fetchProposalbyId());
        });
    };
    console.log(proposal)
    if (status === 'loading' ) return <p>Loaging</p>
    if(error) return <p>{error}</p>
    return(
        <>
            <Header/>
            <main className='main-all-proposal'>
            <p className='ReadexFont title-page'>Your jobs</p>
                {proposal.length !== 0?(
                    <div className="article-tasks">
                        <SearchBar/>
                        { proposal.map((task) =>(
                        <Task key={task.idProposal} handleUpdate={handleUpdate} handledelete={handleDelete} task={task}/>
                    ))}
                    </div>
                ):(
                    <div className='condition-else'>
                    <p className='ReadexFont warning-proposal'>You dont create any proposals. Do you want to create it?</p>
                        <Link to ='/createProposal'>
                            <Button
                                className="ReadexFont"
                                text="Create a proposal"
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