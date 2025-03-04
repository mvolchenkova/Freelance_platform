import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Steps.css';

export default function Steps() {
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/jsonFiles/steps.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCardData(data);
            } catch (error) {
                console.error('Error fetching the episodes:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="stepsDiv ReadexFont">
            {cardData.map((card) => (
                <Card 
                    key={card.id} 
                    image={card.image} 
                    text1={card.title} 
                    text2={card.description} 
                    id={card.id}
                    width="350px" 
                    borderRadius="20px" 
                    text1fontSize="2em" 
                    text1color="rgb(37,42,63)" 
                    text1FontWeight="bold"
                    text2color="rgb(61,66,90)" 
                    text1padding="30% 0 0 0" 
                    text2padding="0px 0 0 0" 
                    cardPadding="20px 20px 40px 20px" 
                    textwidth="90%" 
                    margin={`${card.id * 50}px 0 0 0`} 
                    alternateColors={true}
                />
            ))} 
        </div>
    );
}