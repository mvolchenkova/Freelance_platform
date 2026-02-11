import React from 'react';
import { Box,Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export default function AdminReportNotification({ report,users }) {
  const {  idReportedByUser, idReportedUser, Reason } = report;
    const reporter = users.find(u => u.idUser === idReportedByUser);
  const reported = users.find(u => u.idUser === idReportedUser);

  return (
    <Box sx={{ width: "50%", display: "flex", flexDirection: "row", backgroundColor: "white", padding: "13px 10px 13px 10px", borderRadius: "10px", gap: "10px", justifyContent:"space-between" }}>
        <Box sx={{display:"flex", gap:"10px"}}>
            <Typography><strong>From user:</strong> {reporter?.login || idReportedByUser}</Typography>
            <Typography><strong>Reported user:</strong> {reported?.login || idReportedUser}</Typography>  
        </Box>

      <Typography><strong>Reason:</strong> {Reason}</Typography>
    </Box>
  );
}
