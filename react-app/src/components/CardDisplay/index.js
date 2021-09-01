import React, { useState, useEffect } from 'react'
import { fetchCards } from '../../store/card';
import { useDispatch, useSelector } from 'react-redux'
import './CardDisplay.css';

export const CardDisplay = ({deckId}) => {
    const [cardName, setCardName] = useState('');
    const [results, setResults] = useState([]);
    const deck_cards = useSelector(state => state.deck_cards);
    const cards = useSelector(state => state.card);
    const cards_needed = deck_cards[deckId]

    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchCardResults(){
            if(cards_needed){
                await dispatch(fetchCards(cards_needed));
            }
        }
        fetchCardResults()
    }, [deckId, deck_cards])

    const updateCardName = (value, e) => {
        setCardName(value);
    };

    deckId = parseInt(deckId);
    return (
        <div className="card-container">         
            {cards && cards_needed?.map((card)=>(
                        <img key={cards[card]?.id} 
                        height="320px"src={cards[card]?.img_url} margin="10px"></img>
            ))}
        </div>
    )
}
