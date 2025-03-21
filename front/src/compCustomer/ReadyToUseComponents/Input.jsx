import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

export default function Input(props){

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 10,
      position: 'relative',
      backgroundColor: '#FFFFFF',
      fontSize: 20,
      width: 'auto',
      padding:  ' 5px 10px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
     
      fontFamily: [
        'Belleza',
      ],
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  
  return(
    <BootstrapInput type={props.type} placeholder={props.placeholder} onChange={props.onChange} value={props.value} id="bootstrap-input" />
  )
}