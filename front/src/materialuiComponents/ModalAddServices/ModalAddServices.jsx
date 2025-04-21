import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { createAdditionalService, fetchAdditionalServices } from '../../store/Slices/additionalServicesSlice';
import CustomizedButtons from '../../materialuiComponents/Button.jsx';
import '../ModalAddServices/ModalAddServices.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: '20px',
  border: '1px solid #fff',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AdditionalServicesModal(
  {onCreateService}
) {
  const dispatch = useDispatch();
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const maxLength = 300;
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const idUser = user.user.id

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateService = () => {
    if (serviceName && description && price) {
      onCreateService({ serviceName, description, price });
      handleClose(); 
    } else {
      console.log('All fields are required');
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add service</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" className="title-modal ReadexFont">
            ADD SERVICE
          </Typography>
          <div className="modal">
            <div>
              <Typography className="ReadexFont" sx={{ mb: 1 }}>
                Title
              </Typography>
              <input
                className="input-form proposal-input ReadexFont"
                type="text"
                placeholder="Title"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>

            <div>
              <Typography className="ReadexFont" sx={{ mb: 1 }}>
                Description
              </Typography>
              <div className="text-area-con">
                <textarea
                  className="input-form text-area"
                  placeholder="Description"
                  value={description}
                  maxLength={maxLength}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <p className="max-length ReadexFont">{description.length}/{maxLength}</p>
              </div>
            </div>

            <div>
              <Typography className="ReadexFont" sx={{ mb: 1 }}>
                Price
              </Typography>
              <input
                className="input-form proposal-input ReadexFont"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <CustomizedButtons
              text="Add service"
              color="white"
              backgroundColor="rgb(61,66,90)"
              width="100%"
              func={handleCreateService}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
