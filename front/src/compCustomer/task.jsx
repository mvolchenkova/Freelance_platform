import { useState,useEffect } from 'react'
import Button from '../materialuiComponents/Button'

export default function Task({task, handledelete,handleUpdate}){
    const [isPublish, setIsPublished] = useState(task.isPublished);

    useEffect(() => {
      setIsPublished(task.isPublished); // синхронизация с redux-стором
    }, [task.isPublished]);
  
    const handleToggle = () => {
      const nextIsPublished = !isPublish;
      setIsPublished(nextIsPublished);
      handleUpdate(task.idProposal, nextIsPublished); // вызываем родителя
    };
    return(
        <div key={task.id} className='task-con'>
            <div className='header-task'>
                <p>{task.title}</p>
                    <div className='buttons'>
                        <Button text="Delete proposal"
                            color="rgb(255,255,255)"
                            backgroundColor="rgb(61,66,90)"
                            width="100%"
                            func={() =>handledelete(task.idProposal)}
                        />
                        <Button text={isPublish? 'Unpublish' : 'Publish'}
                            color="rgb(255,255,255)"
                            backgroundColor="rgb(61,66,90)"
                            width="100%"
                            func={handleToggle}
                        />
                    </div>
            </div>
            <p className='ReadexFont'>Description:{task.description}</p>
            <div className='skills-proposal'>
                <p className='ReadexFont warning-proposal'>Skills:</p>
                <div className='skills-div'>
                    {task.skills.split(',').map((skill) =>(
                        <div className='skill-block'>{skill}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}