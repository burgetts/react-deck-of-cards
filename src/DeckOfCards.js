import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card'
import uuid from 'react-uuid';

const BASE_URL = 'https://deckofcardsapi.com/api/deck'

const DeckOfCards = () => {

    let [deckId, setDeckId] = useState(null)
    let [drawnCards, setDrawnCards] = useState([])

    const drawCard = () => {
        axios.get(`${BASE_URL}/${deckId}/draw/?count=1`).then(res => setDrawnCards([...drawnCards, {id: uuid(), image: res.data.cards[0].image, name: `${res.data.cards[0].value} of ${res.data.cards[0].suit}`, remaining: res.data.remaining}]))
    }

    // shuffle deck once to get deck id
    useEffect(() => {
       axios.get(`${BASE_URL}/new/shuffle/`).then(res => setDeckId(res.data.deck_id))
    }, [])


    // want to make an api call to get a new card each time the button is clicked
    // when deck.remaining is 0, send an alert saying no cards remaining
    return (
        <>
            {deckId ? <button onClick={drawCard}>Draw A Card</button> : 'Loading...'}
            {drawnCards.map(card => <Card image={card.image} key={card.id} remaining={card.remaining} />)}
        </>
    )
}

export default DeckOfCards;