import { useState,useEffect } from 'react'
import Button from '../materialuiComponents/Button'

export default function Vacancie({task, handledelete,handleUpdate}){
    const [isPublish, setIsPublished] = useState(task.isPublished);

    useEffect(() => {
      setIsPublished(task.isPublished);
    }, [task.isPublished]);
  
    const handleToggle = () => {
      const nextIsPublished = !isPublish;
      setIsPublished(nextIsPublished);
      handleUpdate(task.idVacancie, nextIsPublished);
    };
    const ViewDate = (date) =>{
        const dateObject = new Date(date);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const year = dateObject.getFullYear();
        return ` ${day}.${month}.${year}
        in
        ${dateObject.getHours()}:${dateObject.getMinutes()}`;
    }
    return(
        <div key={task.id} className='task-con'>
            <div className='header-task'>
                <p className='ReadexFont title-jobs'>{task.title}</p>
                    <div className='buttons'>
                        <Button text="Delete"
                            color="rgb(255,255,255)"
                            backgroundColor="rgb(61,66,90)"
                            width="100%"
                            func={() =>handledelete(task.idVacancie)}
                        />
                        <Button text={isPublish? 'Unpublish' : 'Publish'}
                            color="rgb(255,255,255)"
                            backgroundColor="rgb(61,66,90)"
                            width="100%"
                            func={handleToggle}
                        />
                    </div>
            </div>
            <p className='ReadexFont desctiption-job'>Description:{task.description}</p>
            <div className='skills-proposal'>
                <p className='ReadexFont warning-proposal'>Skills:</p>
                <div className='skills-div'>
                    {task.skills.split(',').map((skill) =>(
                        <div className='skill-block'>{skill}</div>
                    ))}
                </div>
            </div>
            <div className='salary-create-time'>
                <p className='ReadexFont'>Salary: {task.salary}$/month</p>
                <p>{ViewDate(task.createdAt)}</p>
            </div>
        </div>
    )
}