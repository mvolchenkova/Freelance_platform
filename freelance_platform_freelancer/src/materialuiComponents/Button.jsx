import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const ColorButton = styled(Button)(({ backgroundColor, color, borderRadius, fontSize, padding }) => ({
  backgroundColor: backgroundColor || 'rgb(128, 0, 18)',
  color: color || 'rgb(0, 0, 0)', 
  fontFamily: 'Readex Pro, sans-serif',
  borderRadius: borderRadius || '12px', 
  fontSize: fontSize || '16px', 
  padding: padding || '13px',
}));

export default function CustomizedButtons(props) {
  const { text, backgroundColor, color, borderRadius, fontSize, padding } = props;

  return (
    <ColorButton 
      variant="contained" 
      backgroundColor={backgroundColor} 
      color={color} 
      borderRadius={borderRadius} 
      fontSize={fontSize} 
      padding={padding}
    >
      {text}
    </ColorButton>
  );
}