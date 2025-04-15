import './ConInfUser.css';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Button from '../../materialuiComponents/Button';
import SavedFreelancers from '../SavedFreelancers/SavedFreelancers';
export default function ConInfUser() {
  const taskList = [
    {
      id: 1,
      task1: '12e12312asdasdasdasd',
      completed: true,
    },
    {
      id: 2,
      task1: '12e12312',
      completed: false,
    },
    {
      id: 3,
      task1: '12e12312',
      completed: true,
    },
    {
      id: 4,
      task1: '12e12312',
      completed: false,
    },
    {
      id: 5,
      task1: '12e12312',
      completed: false,
    },
    {
      id: 6,
      task1: '12e12312',
      completed: true,
    },
    {
      id: 7,
      task1: '12e12312',
      completed: false,
    },
    {
      id: 8,
      task1: '12e12312',
      completed: false,
    },
    {
      id: 9,
      task1: '12e12312',
      completed: true,
    },
  ];

  const completedTasks = taskList.filter((task) => task.completed).length;
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const userRole = user.user.role;
  return (
    <article className="flex-column user-cart stat-block">
      <h2 className="header-block">Statistic</h2>
      <div className="graphics flex-row justify-around">
        <div className="Pie-stat flex-column align-center">
          <h3 className="center-text">Completed tasks</h3>
          <Gauge
            value={completedTasks}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 45,
                transform: 'translate(0px, 0px)',
              },
            }}
            valueMax={taskList.length}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
            height={300}
            width={300}
          />
        </div>
        <div className="TaskList flex-column align-center">
          {taskList.slice(0, 6).map((task) => (
            <div key={task.id} className="task flex-row align-center justify-between" id={task.id}>
              <span className="bounded"> {task.id}</span>
              <p>
                Task: {task.task1.length > 15 ? task.task1.slice(0, 15) + '...' : task.task1}.
                Stage: {task.completed ? 'completed' : 'in develop'}
              </p>
            </div>
          ))}
          <Button
            className="ReadexFont"
            text="View all tasks"
            backgroundColor="rgb(219, 242, 215)"
            color="#000"
            fontSize="16px"
          />
        </div>
      </div>
      <h2 className="header-block">
        {userRole == 'customer' ? 'Saved freelancers' : 'Saved customers'}
      </h2>
      <SavedFreelancers />
      {userRole == 'customer' ? (
        <>
          <h2 className="header-block"></h2>
          <div className="flex-row align-center create-job-vacancie">
            <Button
              className="ReadexFont"
              text="Create a job"
              backgroundColor="rgb(219, 242, 215)"
              color="#000"
              fontSize="16px"
              width="200px"
            />
            <p className="ReadexFont">
              - you can create a jobs for freelancers and they can help to resolve you problem
            </p>
          </div>
          <div className="flex-row align-center create-job-vacancie">
            <Button
              className="ReadexFont"
              text="Create a vacancie"
              backgroundColor="rgb(219, 242, 215)"
              color="#000"
              fontSize="16px"
              width="200px"
            />
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
