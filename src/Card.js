import React from 'react';
import './Card.css'

const Card = ({image, angle}) => {
    return (
     
        <div className="Card" style={{transform: `rotate(${angle}deg)`}} >
           <img alt="card" src={image}></img>
        </div>
    )
}

export default Card;


