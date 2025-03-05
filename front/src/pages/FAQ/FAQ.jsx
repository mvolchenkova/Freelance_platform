import './FAQ.css'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../../materialuiComponents/Button';
import Accordion  from '../../materialuiComponents/Accordion';
import StillHaveQuestion from '../../components/StillHaveQuestion/StillHaveQuestion'
export default function FAQ(){
    return(
        <main className="main-FAQ">
            <div className='header-faq'>
                <p className='small-letters ReadexFont'>FAQ</p>
                <b className='title-faq ReadexFont'>Helpping You Is Our Priority</b>
                <div className="searhDiv">
                    <div className="ReadexFont search">
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "100%", borderRadius: "15px",
                            padding: "10px"}}
                            >
                            <IconButton sx={{ p: '10px', color: 'rgb(71, 209, 140)' }} aria-label="search">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search questions"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <Button text="Search" backgroundColor="rgb(71, 209, 140)" color="white"/>
                        </Paper>
                    </div>
                </div>
            </div>
            <div className='accordion'>
                <Accordion/>    
            </div>
           <StillHaveQuestion/>
        </main>

    )
}