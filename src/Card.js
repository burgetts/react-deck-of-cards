import React from 'react';

const Card = ({image, remaining}) => {
    return (
        <div>
            {remaining === 0 ? alert('Error: No cards remaining') : <img alt="card" src={image}></img>}
        </div>
    )
}

export default Card;