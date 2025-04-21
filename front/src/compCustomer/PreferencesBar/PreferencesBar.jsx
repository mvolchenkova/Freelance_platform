import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { useState, useEffect } from 'react'; // Добавлен useEffect
import Checkbox from '../../materialuiComponents/Checkbox';
import '../PreferencesBar/PreferencesBar.css';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, fetchCategories } from '../../store/Slices/categorySlicer';

export default function PreferencesBar() {
    const dispatch = useDispatch();
    const [openStates, setOpenStates] = useState({
        experience: true,
        category: false,
        employmentType: false,
        salaryRange: false,
        employmentStatus: false,
        location: false,
        timeZones: false,
    });
    const { items: categories = [], loading, error } = useSelector((state) => state.categories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    
    const handleClick = (key) => {
        setOpenStates((prevStates) => ({
            ...prevStates,
            [key]: !prevStates[key],
        }));
    };
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setOpen(false);
        setCategoryName('');
    };
    const handleSave = () => {
        const trimmedName = categoryName.trim();
        if (!trimmedName) {
          alert("Название категории не может быть пустым");
          return;
        }
        dispatch(createCategory(trimmedName))
          .then(() => {
            setOpen(false);
            setCategoryName('');
          });
      };
    return (
        <div className="ReadexFont preferBar">
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', borderRadius:"15px" }} component="nav">
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
                    <List component="div" disablePadding sx={{display:"flex",alignItems:"center",flexDirection:"column"}}>
                    {loading ? (
                        <div>Loading categories...</div>
                        ) : error ? (
                        <div>Error loading categories: {error}</div>
                        ) : categories.length === 0 ? (
                        <div>No categories found</div>
                        ) : (
                        categories.map((category) => (
                            <ListItemButton key={category.id} sx={{ pl: 4, paddingLeft: 0, width:"100%"}}>
                            <Checkbox />
                            <ListItemText primary={category.nameOfCategory} /> {/* Исправлено на nameOfCategory */}
                            <p className="amount">12</p>
                            </ListItemButton>
                        ))
                        )}
                        <Button 
                            onClick={handleClickOpen} 
                            sx={{
                                borderRadius: "100px",
                                minWidth: "40px",
                                width: "40px",
                                backgroundColor: "white",
                                fontSize: "24px",
                                padding: 0
                            }}
                        >
                            +
                        </Button>
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

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav">
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

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Добавить новую категорию</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="categoryName"
                            label="Название категории"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button onClick={handleSave} disabled={!categoryName.trim()}>Сохранить</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}