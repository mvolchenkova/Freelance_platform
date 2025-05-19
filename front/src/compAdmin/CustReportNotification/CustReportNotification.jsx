import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CustReportNotification({ report, users, onDelete }) {
  const { idReport, idReportedUser, Reason, Status } = report;

  const reported = users.find(u => u.idUser === idReportedUser);

  let backgroundColor = 'white';
  if (Status === 'denied') backgroundColor = '#ffcccc';      // light red
  else if (Status === 'viewed') backgroundColor = '#ccffcc'; // light green

  return (
    <Box
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor,
        padding: '10px 10px',
        borderRadius: '10px',
        gap: '10px',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <Typography>
          <strong>You reported:</strong> {reported?.login || idReportedUser}
        </Typography>
        <Typography>
          <strong>Reason:</strong> {Reason}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconButton
          onClick={() => onDelete(idReport)}
          color="error"
          size="small"
          sx={{ alignSelf: 'flex-start' }}
        >
          <DeleteIcon />
        </IconButton>
        <Typography>
          <strong>Status:</strong>{' '}
          {Status === 'viewed' ? 'Viewed' : Status === 'denied' ? 'Denied' : 'На рассмотрении'}
        </Typography>
      </Box>
    </Box>
  );
}
