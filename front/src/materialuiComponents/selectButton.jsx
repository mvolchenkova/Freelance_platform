import * as React from 'react';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 16,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solidrgb(255, 255, 255)',
    fontSize: 14,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 16,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(255, 255, 255, 0.25)',
    },
  },
}));

export default function CustomizedSelects() {
  const [sort, setSort] = React.useState('');
  const handleChange = (event) => {
    setSort(event.target.value);
  };
  return (
      <FormControl sx={{ m: 1 }} variant="standard">

        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={sort}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={1}>Most relevant</MenuItem>
          <MenuItem value={2}>Newest</MenuItem>
          <MenuItem value={3}>Oldest</MenuItem>
        </Select>
      </FormControl>
   
  );
}