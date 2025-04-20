import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './ModalUpdInf.css'
import CustomizedButtons  from '../Button.jsx'
import { useState } from 'react';
import { EditInformation,fetchInf } from '../../store/Slices/userSlicer.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: "20px",
  border:'1px solid #fff',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(inf) {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchInf())
  },[dispatch])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [salary,setSalary] = useState(inf.inf.salary) || 0
  const [location, setLocation] = useState(inf.inf.location) || ''
  const [describe,setDescribe] = useState(inf.inf.description) || ''
  const maxLength = 300;
  console.log(inf)
  const handleSetSalary = (e) =>{
    setSalary(e.target.value);
  }
  const handlesetLocation = (e) =>{
    setLocation(e.target.value);
  }
  const handlesetDescribe = (e) =>{
    setDescribe(e.target.value);
  }
  const updInformation = (salary,location,description) =>{
    dispatch(EditInformation({salary,location,description}))
  }
  return (
    <div>
      <Button onClick={handleOpen}>Update information</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" className='title-modal ReadexFont' component="h2">
            Fill information about you from better communication
          </Typography>
          <div className='modal'>
            <div>
              <Typography id="modal-modal-description" className='ReadexFont' sx={{ mb: 1 }}>
                Write salary
              </Typography>
              <input
                className="input-form proposal-input ReadexFont"
                type="text"
                id='salary'
                required
                placeholder="Salary"
                onChange={handleSetSalary}
                value={salary}
              /> 
            </div>
            <div>
              <Typography id="modal-modal-description" className='ReadexFont' sx={{ mb: 1 }}>
                Write your country
              </Typography>
              <input
                className="input-form proposal-input ReadexFont"
                type="text"
                id='country'
                required
                placeholder="Country"
                onChange={handlesetLocation}
                value={location}
              /> 
            </div>
            <div>
              <Typography id="modal-modal-description" className='ReadexFont' sx={{ mb: 1 }}>
                Write information about you
              </Typography>
              <div className='text-area-con'>
                <textarea
                  className="input-form text-area"
                  type="text"
                  id='describe'
                  placeholder="Information"
                  onChange={handlesetDescribe}
                  value={describe}
                  maxLength={maxLength}
                />
                <p className='max-length ReadexFont'>{describe.length}/{maxLength}</p>
              </div>
            </div>
            <CustomizedButtons text="Update information"
            color="rgb(255,255,255)"
            backgroundColor="rgb(61,66,90)"
            width="100%"
            func={() =>updInformation(salary,location,describe)}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}