import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import Checkbox from '../../materialuiComponents/Checkbox';
import '../PreferencesBar/PreferencesBar.css';

export default function PreferencesBar() {
    const [openStates, setOpenStates] = useState({
        experience: true,
        category: false,
        employmentType: false,
        salaryRange: false,
        employmentStatus: false,
        location: false,
        timeZones: false,
    });

    const handleClick = (key) => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key],
        }));
    };

    return (
        <div className="ReadexFont preferBar">
<<<<<<< HEAD
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
=======
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  borderRadius: '15px' }} component="nav">
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
                <ListItemButton onClick={() => handleClick('experience')}>
                    <ListItemText primary="Experience level" />
                    {openStates.experience ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.experience} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['0-2 years', '3-5 years', '6-9 years', '10+ years'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton onClick={() => handleClick('category')}>
                    <ListItemText primary="Category" />
                    {openStates.category ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.category} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['programming', 'design', 'voice acting', 'tutor'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton onClick={() => handleClick('employmentType')}>
                    <ListItemText primary="Type of employment" />
                    {openStates.employmentType ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.employmentType} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Fulltime', 'Part-time', 'Remote', 'Internship/Trainee', 'Hourly'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton onClick={() => handleClick('salaryRange')}>
                    <ListItemText primary="Salary Range" />
                    {openStates.salaryRange ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.salaryRange} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['under $100', '$100-500', '$500-1000', 'over $1000'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton onClick={() => handleClick('employmentStatus')}>
                    <ListItemText primary="Employment Status" />
                    {openStates.employmentStatus ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.employmentStatus} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Full-time', 'Part-time', 'Contract', 'Temporary'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
                <ListItemButton onClick={() => handleClick('location')}>
                    <ListItemText primary="Location" />
                    {openStates.location ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.location} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Saudi Arabia', 'United States', 'Germany', 'Australia'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>

<<<<<<< HEAD
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
=======
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',  borderRadius: '15px' }} component="nav">
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
                <ListItemButton onClick={() => handleClick('timeZones')}>
                    <ListItemText primary="Time Zones" />
                    {openStates.timeZones ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openStates.timeZones} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['GMT', 'CET', 'EST', 'PST'].map((text) => (
                            <ListItemButton key={text} sx={{ pl: 4, paddingLeft: 0 }}>
                                <Checkbox />
                                <ListItemText primary={text} />
                                <p className="amount">12</p>
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>
            </List>
        </div>
    );
}