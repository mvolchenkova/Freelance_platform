import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorCheckboxes() {
  return (
    <div>
      <Checkbox
        {...label}
        sx={{
          color: 'rgb(71,209,140)',
          '&.Mui-checked': { color: 'rgb(71,209,140)' },
        }}
      />
    </div>
  );
}
