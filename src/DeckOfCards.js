import React, { useEffect, useState, useRef,  } from 'react';
import axios from 'axios';
import Card from './Card'
import './DeckOfCards.css'

const DeckOfCards = () => {

    let [cardsLeft, setCardsLeft] = useState()
    let [shownCards, setShownCards] = useState([])
    let [drawing, setDrawing] = useState(false)
    const timerId = useRef(null)

    // get all cards on load
    useEffect(() => {
       axios.get('https://deckofcardsapi.com/api/deck/new/draw/?count=52').then(res => setCardsLeft(res.data.cards))
    }, [])

    // whenever drawing changes, start timer and call draw card every second
    useEffect(() => {
        if (drawing === true) {
            timerId.current = setInterval(() => {
                drawCard()
            }, 1000);
    }
        return function cleanUpClearTimer() {
        clearInterval(timerId.current);
        timerId.current = null
        };
    }, [drawing]);

    function toggleDraw() {
       if (drawing === true){
        setDrawing(false)
       }
       else {setDrawing(true)}
    }

    /* Choose card from cardsLeft to show */
    function drawCard() {
        if (cardsLeft.length !== 0) { 
            const newCard = cardsLeft[Math.floor(Math.random()*cardsLeft.length)]
            setCardsLeft(cardsLeft.filter(card => card.code !== newCard.code))
            setShownCards([...shownCards, {...newCard, angle: Math.floor(Math.random() * (180))}])
        }
        else {
            alert('Error: No cards remaining.')
            toggleDraw()
        }
    }

    return (
        <div className="DeckOfCards">
            {cardsLeft ? <button className="DeckOfCards-button" onClick={toggleDraw}> {drawing === true ? 'Stop Drawing' : 'Start Drawing'} </button> : 'Loading...'}
            <span>
                {shownCards.map(card=> <Card image={card.image} key={card.code} angle = {card.angle}/>)} 
            </span>
        </div>
    )
}

export default DeckOfCards;

