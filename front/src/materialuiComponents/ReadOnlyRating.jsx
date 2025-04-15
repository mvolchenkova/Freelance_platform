import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function BasicRating(props) {
  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Typography component="legend">Rating: {props.value ? props.value : 0}</Typography>
      <Rating name="read-only" value={props.value ? props.value : 0} readOnly />
    </Box>
  );
}

export default BasicRating;
