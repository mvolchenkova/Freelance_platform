import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '../../materialuiComponents/Button.jsx';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CustomizedButtons from '../../materialuiComponents/Button.jsx';
import '../ModalFreelancerDetails/ModalFreelancerDetails.css';
import { getByUserId } from '../../store/Slices/portfolioSlice.js';
import { fetchAdditionalServicesByIds } from '../../store/Slices/additionalServicesSlice.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  borderRadius: '20px',
  border: '1px solid #fff',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function ModalFreelancerDetails({candidate}) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const candPortfolio = useSelector((state)=>state.portfolio.portfolio)

  const addServices = useSelector((state)=>state.additionalServices.addService)
  useEffect(()=>{
    dispatch(fetchAdditionalServicesByIds(candidate.idUser))
  },[dispatch])

  console.log(addServices)
  useEffect(()=>{
    dispatch(getByUserId(candidate.idUser))
  },[dispatch])

  console.log(candidate)
  return (
    <div>
        <Button
            text="Detail Information"
            backgroundColor="#F3F3F3"
            color="#7F879E"
            width="100%"
            func={handleOpen}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className="title-modal ReadexFont">
            <span className='fontWeight600'>{candidate.login}</span> detail info
          </Typography>
          <div className="modalDetails marginTop20 gap20">
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Mobile phone: </p>
              <p className='margin0'>{candPortfolio.phone}</p>
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Location: </p>
              <p className='margin0'>{candidate.UserInformation.location}</p>
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Salary expectations: </p>
              <p className='margin0'>${candidate.UserInformation.salary}</p>
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Education: </p>
              <p className='margin0'>{candPortfolio.education}</p>
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Skills: </p>
              <p className='margin0'>{candPortfolio.skills}</p>
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Work experience: </p>
              <p className='margin0'>{candPortfolio.workExperience}</p>
            </div>
            <div className='flex-colum gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Additional services: </p>
              {addServices.length>0&&(
                addServices.map((service)=>(
                  <p className='margin0'>- {service.serviceName}: {service.description} (${service.price})</p>
                ))
              )}
            </div>
            <div className='flex-row align-center gap10'>
              <p className='fontWeight500 fontSize12em margin5'>Other information: </p>
              <p className='margin0'>{candidate.UserInformation.description}</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
