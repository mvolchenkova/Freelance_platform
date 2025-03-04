import './Card.css';

export default function Card(props) {
    const { id,
        text1, 
        text2, 
        backgroundColor, 
        text1color, 
        text2color,
        cardPadding, 
        text1fontSize, 
        text1FontWeight,
        text2fontSize,
        text2FontWeight,
        width, 
        borderRadius, 
        margin,
        text1padding,
        text2padding,
        gap,
        textwidth,
        height,
        image,
        alternateColors,
        cardBorder
        } = props;

        const defaultTextColor1 = 'black';
        const defaultTextColor2 = 'black';
        const defaultBackgroundColor = 'white';
    
        const textColor1 = (alternateColors && id % 2 === 0) ? 'rgb(234, 237, 182)' : text1color || defaultTextColor1; 
        const textColor2 = (alternateColors && id % 2 === 0) ? 'rgb(234, 237, 182)' : text2color || defaultTextColor2;
        const backgroundColorFinal = (alternateColors && id % 2 === 0) ? 'rgb(61, 66, 90)' : backgroundColor || defaultBackgroundColor; 

    const cardStyle = {
        backgroundColor: backgroundColorFinal || 'white', 
        padding: cardPadding || '10px',
        width: width || '100%',
        height: height || '400px',
        borderRadius: borderRadius || '0px',
        margin: margin || '50px 0 0 0',
        flex: '0 0 auto',
        border: cardBorder || '0px'
    }

    const text1style = {
        fontSize: text1fontSize || '1em',
        color: textColor1, 
        padding: text1padding || '0',
        fontWeight: text1FontWeight || '400'
    }

    const text2style = {
        fontSize: text2fontSize || '1em',
        color: textColor2, 
        padding: text2padding || '0',
        fontWeight: text2FontWeight || '400'
    }
    
    const textDivStyle = {
        gap: gap || '0',
        width: textwidth || '100%'
    }
    
    return (
        <div style={cardStyle}>
            <img src={image} alt=""/> 
            <div style={textDivStyle}>
                <p style={text1style}>{text1}</p>
                <p style={text2style}>{text2}</p>
            </div>
        </div>
    );
}