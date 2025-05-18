import { Typography,Box } from '@mui/material';


export default function Notifications({ fine }) {


  // Функция для форматирования даты
  const ViewDate = (date) => {
    const dateObject = new Date(date);
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    return `${day}.${month}.${year} at ${dateObject.getHours()}:${dateObject.getMinutes()}`;
  };

  return (
      <Box sx={{backgroundColor:"rgb(255, 191, 106)",width:"50%",padding:"10px 10px 10px 10px", borderRadius:"15px",display:"flex",justifyContent:"space-between"}} >
        <Typography sx={{}}>Warning: {fine?.Reason}</Typography>
        <Typography > {ViewDate(fine?.createdAt)}</Typography>
      </Box>
  );
}
