import * as React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
export default function TransitionAlerts(props) {
    const [open, setOpen] = React.useState(true);
    const closed = () =>{
      setOpen(false);
      props.setisBlocked(false);
    }

  return (
    <Box sx={{ width: '50%' }}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                closed();
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
          severity='error'
        >
          {props.message}
        </Alert>
      </Collapse>
    </Box>
  );
}