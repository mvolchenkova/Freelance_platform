import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const ColorButton = styled(Button)(
  ({ backgroundColor, color, borderRadius, fontSize, padding, width }) => ({
    backgroundColor: backgroundColor || 'rgb(128, 0, 18)',
    color: color || 'rgb(0, 0, 0)',
    fontFamily: 'Readex Pro, sans-serif',
    borderRadius: borderRadius || '12px',
    fontSize: fontSize || '16px',
    padding: padding || '13px',
    display: 'flex',
    alignItems: 'center',
    textTransform: 'none',
    width: width || 'fit-content',
  }),
);

export default function CustomizedButtons(props) {
  const { text, backgroundColor, color, borderRadius, fontSize, padding, showArrow, func, width } =
    props;
  return (
    <ColorButton
      variant="contained"
      backgroundColor={backgroundColor}
      color={color}
      borderRadius={borderRadius}
      fontSize={fontSize}
      padding={padding}
      onClick={func}
      width={width}
      onClickCapture={func}
    >
      {text}
      {showArrow && <ArrowForwardIcon style={{ marginLeft: '8px' }} />}
    </ColorButton>
  );
}
