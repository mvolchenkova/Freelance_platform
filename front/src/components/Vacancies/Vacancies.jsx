import '../Vacancies/Vacancies.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '../../materialuiComponents/Button'
export default function Vacancies(){
    const canditates = {
        name:"Syeda Johnston",
        age: 22,
        RegisterDate: "2y 6m",
        Profession: "Product UX Designer",
        location: "California, USA",
        payment: "100,000",
        smallDesc: "Part-time. 2.6 years experience. Higher education",
        skills:[
            "Part-time","UI Design","Designer","Remote"
        ]
    };
    return(
        <main className='main-vacancies'>
            <div className="sortDiv">
                <div>
                    <p>Recomendation</p>
                    <p>38 product designer Jobs in United States</p>
                </div>
                <div>
                    <p>Sort by:</p>
                </div>
            </div>
            <div className='carts'>
                <article className='candidate-cart'>
                    <div className='candidate-div'>
                        <div className='header-cart'>
                            <Stack direction="row" spacing={2}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sizes={72} />
                            </Stack>
                            <div className='additional-buttons'>
                                <button className='more-inf'>
                                    <img src="./images/more.png" width="42px" height="42" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className='candidate-inf'>
                            <div className='candidate-name'>
                                <p className='ReadexFont gray'>{canditates.name}, {canditates.age} y.o.</p>
                                <p className='ReadexFont gray'>{canditates.RegisterDate}</p>
                            </div>
                            <p className='ReadexFont fontWeight600'>{canditates.Profession}</p>
                            <div className='location-payment'>
                                <div className='flex-row align-center'>
                                    <img src="./images/location.png" alt="" />
                                    <p className='ReadexFont gray'>
                                        {canditates.location}
                                    </p>
                                </div>
                                <div className='flex-row align-center'>
                                    <img src="./images/dollar-circle.png" alt="" />
                                    <p className='ReadexFont gray'>
                                        <span className='fontWeight600 black'>
                                            ${canditates.payment}
                                        </span>
                                    /Month</p>
                                    </div>
                            </div>
                            <p className='ReadexFont gray'>{canditates.smallDesc}</p>
                        </div>
                        <div className='flex-row align-center justify-between'>
                            {canditates.skills.map(elem =>(
                                <div className='skill'>
                                    <p className='ReadexFont gray'>{elem}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex-row align-center justify-between'>
                        <Button text='Send message' backgroundColor="#4FCB94" color='white' width="45%"/>
                        <Button text='Detail Information' backgroundColor="#F3F3F3" color='#7F879E' width="45%"/>
                    </div>
                </article>
            </div>
           
        </main>
    )
}