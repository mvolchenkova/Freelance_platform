import Header from '../compCustomer/Header/Header';
import SupportComp from '../compAdmin/SupportComp/SupportComp'
import { Box } from '@mui/material';

export default function Support() {
  return (
    <>
      <Header />
      <Box sx={{width:"100%", display:"flex",justifyContent:"center"}}>
        <SupportComp/>
      </Box>
      
    </>
  );
}
