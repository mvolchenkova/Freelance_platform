import './ConInfUser.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Button from '../../materialuiComponents/Button';
import SavedFreelancers from '../SavedFreelancers/SavedFreelancers';
import { fetchProposalbyId } from '../../store/Slices/proposalSlicer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdditionalServicesByIds } from '../../store/Slices/additionalServicesSlice';
import { deleteAdditionalService, removeService } from '../../store/Slices/additionalServicesSlice';

export default function ConInfUser() {
const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(fetchProposalbyId())
  },[dispatch])

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userId = user?.user?.id;

  const { addService, statusService } = useSelector((state) => state.additionalServices);
    
  useEffect(() => {
    dispatch(fetchAdditionalServicesByIds(userId));
  }, [dispatch,userId]);

  const userRole = user.user.role;
  const {proposal,status} = useSelector((state) => state.proposal)
  

  if(status === 'loading') return <p>Loading</p>
  if(statusService === 'loading') return <p>Loading</p>
  const completedProposal = Array.isArray(proposal) 
    ? proposal.filter((task) => task.stage === 'completed').length 
    : 0;
  const handleDeleteService = (serviceId) => {
    dispatch(removeService(serviceId))
    dispatch(deleteAdditionalService({serviceId}))
  };
  

  return (
    <article className="flex-column user-cart stat-block">
      <h2 className="header-block">Statistic</h2>
      <div className="graphics flex-row justify-around">
        {proposal.length === 0?(
          userRole === 'customer'?(
            <div className='condition-else'>
            <p className='ReadexFont warning-proposal'>You dont create any task. Do you want to create it?</p>
              <Link to ='/createProposal'>
                <Button
                  className="ReadexFont"
                  text="Create a task"
                  backgroundColor="rgb(219, 242, 215)"
                  color="#000"
                  fontSize="16px"
                  width="200px"
              />
            </Link>
            </div>
          ):(
            <></>
          )
        ) :(
          <>
          <div className="Pie-stat flex-column align-center">
          <h3 className="center-text">Completed tasks</h3>
          <Gauge
            value={completedProposal}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 45,
                transform: 'translate(0px, 0px)',
              },
            }}
            valueMax={proposal.length}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
            height={300}
            width={300}
          />
        </div>
        <div className="TaskList flex-column align-center justify-between">
          {Array.isArray(proposal) && proposal.slice(0, 6).map((task) => (
            <div key={task.id} className="task flex-row align-center justify-between" id={task.idProposal}>
              <span className="bounded"> {task.idProposal}</span>
              <p>
                Task: {task.title.length > 15 ? `${task.title.slice(0, 15)}...` : task.title} Stage: 
                <span className={`${task.stage === 'Not taken' 
                  ? 'not-taken'
                  : task.stage ==='In develop' 
                  ? 'in-develop' : 'completed'}`}>
                  {task.stage}</span>
              </p>
            </div>
          ))}
          <Link to={userRole === 'customer' ? '/userProposal' : ''}>
            <Button
              className="ReadexFont"
              text="View all tasks"
              backgroundColor="rgb(219, 242, 215)"
              color="#000"
              fontSize="16px"
            />
          </Link>
         
        </div>
          </>
        )}
        
      </div>
      <h2 className="header-block">
        {userRole === 'customer' ? 'Saved freelancers' : 'Saved customers'}
      </h2>
      <SavedFreelancers />
      {userRole === 'customer' ? (
        <>
          <div className="flex-row align-center create-job-vacancie">
            <Link to='/createProposal'>
              <Button
                className="ReadexFont"
                text="Create a job"
                backgroundColor="rgb(219, 242, 215)"
                color="#000"
                fontSize="16px"
                width="200px"
              />
            </Link>
           
            <p className="ReadexFont">
              - you can create a jobs for freelancers and they can help to resolve you problem
            </p>
          </div>
          <div className="flex-row align-center create-job-vacancie">
            <Link to ='/createVacancie'>
              <Button
                className="ReadexFont"
                text="Create a vacancie"
                backgroundColor="rgb(219, 242, 215)"
                color="#000"
                fontSize="16px"
                width="200px"
              />
            </Link>
           
            <p className="ReadexFont">
              - you can create a vacancie for freelancers and they can become your employee
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
     
     {userRole === 'freelancer' ? (
      <div className="your-services ReadexFont">
        <h2 className="header-block">Your additional services</h2>
        {statusService === 'loading' ? (
          <p>Loading services...</p>
        ) : addService.length > 0 ? (
          addService.map((service) => (
            <div className='serviceNbutton'>
              <div key={service.serviceId} className="service-card">
                <h3>{service.serviceName}</h3>
                <p>{service.description}</p>
                <p>Price: ${service.price}</p>
              </div>
              <Button  
              text="DELETE"
              backgroundColor="rgb(236, 113, 121)"
              color="#000"
              fontSize="20px"
              width="200px"
              func={() => handleDeleteService(service.serviceId)}/>
            </div>
            
          ))
        ) : (
          <p className="ReadexFont">- you have no services yet</p>
        )}
      </div>
    ) : null}


      <h2 className="header-block">Requests</h2>
    </article>
  );
}
