import './Opportunities.css';
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';

export default function Opportunities() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/jsonFiles/opportunities.json');
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
    <div className="oppMainDiv">
      <p className="ReadexFont oppTitle">
        A world of <span className="greenText">opportunities</span>
      </p>
      <p className="ReadexFont oppText">
        We are the most efficient and reliable source of hiring processes and two times faster than
        any other companies
      </p>
      <div className="opportunitiesDiv ReadexFont">
        {cardData.map((card) => (
          <Card
            key={card.id}
            image={card.image}
            text1={card.title}
            text2={card.description}
            id={card.id}
            text1color={card.text1color}
            text1FontWeight="bold"
            text2color="rgb(61,66,90)"
            width="295px"
            borderRadius="30px"
            text1fontSize="2em"
            text1padding="20% 0 0 0"
            text2padding="0px 0 0 0"
            cardPadding="20px 20px 0px 20px"
            textwidth="90%"
            margin={card.id === '2' || card.id === '4' ? `${100}px 0 0 0` : '0'}
          />
        ))}
      </div>
    </div>
  );
}
