import './Partners.css'
=======
import '../Partners/Partners.css'
>>>>>>> 8084a7f7ef9f32e816149dee2cadad555546f378
import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';

export default function Partners(){

    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/jsonFiles/partners.json');
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

    return(
        <div className="ReadexFont partnersMainDiv">
            <div className="partnersSliderNavigation">
                <p className="worldClassText">Working With<span className="greenText"> World Class </span>Partners</p>
                <div className="sliderArrowsDiv">
                    <p className="arrowsText">Our hiring process is so simple and easy to do, just follow the steps and you’re done!</p>
                    <div>
                        <img src="/images/leftArrow.svg" alt="" />
                        <img src="/images/rightArrow.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className="partnersDiv ReadexFont">
                {cardData.map((card) => (
                    <Card 
                        key={card.id} 
                        image={card.image} 
                        text1={card.title} 
                        text2={card.description} 
                        id={card.id}
                        text1color="rgb(61,66,90)" 
                        text1FontWeight="400"
                        text2color="rgb(61,66,90)" 
                        width="400px" 
                        borderRadius="30px" 
                        text1fontSize="1.125em" 
                        text1padding="30px 0 0 0" 
                        text2padding="0px 0 0 0" 
                        cardPadding="30px 30px 30px 30px" 
                        textwidth="90%" 
                        backgroundColor="transparent"
                        cardBorder="2px solid grey"
                        height="270px"
                    />
                ))} 
            </div>
            <div className="logosDiv">
                <img src="/images/AirbnbLogo.svg" alt="" />
                <img src="/images/RakutenLogo.svg" alt="" />
                <img src="/images/GoogleLogo.svg" alt="" />
                <img src="/images/InVisionLogo.svg" alt="" />
                <img src="/images/StripeLogo.svg" alt="" />
                <img src="/images/ZendeskLogo.svg" alt="" />
            </div>
        </div>
    )
}