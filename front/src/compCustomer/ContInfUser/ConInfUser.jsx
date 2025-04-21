import './ConInfUser.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Button from '../../materialuiComponents/Button';
import SavedFreelancers from '../SavedFreelancers/SavedFreelancers';
import { fetchProposalbyId } from '../../store/Slices/proposalSlicer';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
export default function ConInfUser() {
const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchProposalbyId())
  },[dispatch])

  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userRole = user.user.role;
  const {proposal,status} = useSelector((state) => state.proposal)
  const completedProposal = proposal.filter((task) => task.stage === 'completed').length;
  if(status === 'loading') return <p>Loading</p>
  return (
    <article className="flex-column user-cart stat-block">
      <h2 className="header-block">Statistic</h2>
      <div className="graphics flex-row justify-around">
        {proposal.length === 0?(
          userRole === 'customer'?(
            <div className='condition-else'>
            <p className='ReadexFont warning-proposal'>You dont create any task. Do you want to create it?</p>
              <Link to ='/createVacancie'>
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
          {proposal.slice(0, 6).map((task) => (
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
      <h2 className="header-block">Requests</h2>
    </article>
  );
}
