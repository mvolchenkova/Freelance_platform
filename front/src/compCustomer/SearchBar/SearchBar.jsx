import '../SearchBar/SearchBar.css';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Button from '../../materialuiComponents/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export default function SearchBar() {
  const [country, setCountry] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <div className="searhDiv">
      <div className="ReadexFont search">
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            borderRadius: '15px',
            padding: '10px',
          }}
        >
          <IconButton sx={{ p: '10px', color: 'rgb(71, 209, 140)' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Product designer"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <FormControl variant="outlined" sx={{ width: '20%', border: 'none' }}>
            {country === '' && <InputLabel id="country-select-label">Country</InputLabel>}
            <Select
              labelId="country-select-label"
              value={country}
              onChange={handleChange}
              variant="standard"
              label="Country"
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '40px',
                  border: 'none',
                },
                border: 'none',
              }}
            >
              <MenuItem value={10}>
                <img
                  src="/images/location.svg"
                  alt="Location"
                  style={{ width: '20px', marginRight: '10px' }}
                />
                USA
              </MenuItem>
              <MenuItem value={20}>
                <img
                  src="/images/location.svg"
                  alt="Location"
                  style={{ width: '20px', marginRight: '10px' }}
                />
                Canada
              </MenuItem>
              <MenuItem value={30}>
                <img
                  src="/images/location.svg"
                  alt="Location"
                  style={{ width: '20px', marginRight: '10px' }}
                />
                UK
              </MenuItem>
              <MenuItem value={40}>
                <img
                  src="/images/location.svg"
                  alt="Location"
                  style={{ width: '20px', marginRight: '10px' }}
                />
                Australia
              </MenuItem>
            </Select>
          </FormControl>
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <Button text="Search" backgroundColor="rgb(71, 209, 140)" color="white" width="15%" />
        </Paper>
      </div>
    </div>
  );
}
