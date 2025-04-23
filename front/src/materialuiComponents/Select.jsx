import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ handleSelect }) {
  const [offer, setOffer] = React.useState('');

  const handleChange = (event) => {
    setOffer(event.target.value);
    handleSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Offer</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={offer} // Используйте состояние offer
          label="Offer"
          onChange={handleChange}
        >
          <MenuItem value='vacancies'>Vacancies</MenuItem>
          <MenuItem value='proposals'>Proposals</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}