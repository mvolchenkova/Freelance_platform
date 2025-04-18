import './UsersTasks.css'
import Header from '../../compCustomer/Header/Header'
import SearchBar from '../../compCustomer/SearchBar/SearchBar'
import { fetchProposalbyId,removeProposal,deleteProposal,publishProposal } from '../../store/Slices/proposalSlicer'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Task from '../../compCustomer/task'
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

    if (status === 'loading' ) return <p>Loaging</p>
    if(error) return <p>{error}</p>
    return(
        <>
            <Header/>
            <main className='main-all-proposal'>
                <SearchBar/>
                <p className='ReadexFont title-page'>Your jobs</p>
                <div className='all-tasks-con'>
                    {proposal?(
                        proposal.map((task) =>(
                        <Task key={task.idProposal} handleUpdate={handleUpdate} handledelete={handleDelete} task={task}/>
                        ))
                        
                    ):(
                        <p className='ReadexFont warning-proposal'>You dont create any tasks</p>
                    )}
                </div>
            </main>
        </>
    )
}