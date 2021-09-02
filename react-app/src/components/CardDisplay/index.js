import React, { useState, useEffect } from 'react'
import { fetchCards } from '../../store/card';
import { fetchDeckCard } from '../../store/deck_cards';
import { useDispatch, useSelector } from 'react-redux'
import './CardDisplay.css';

export const CardDisplay = ({deckId}) => {
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

    async function deleteClick(cardId){
        await dispatch(fetchDeckCard(cardId, deckId));
        console.log(cardId, deckId);
    }

    deckId = parseInt(deckId);
    return (
        <div className="card-container">         
            {cards && cards_needed?.map((card)=>(
                        <li key={cards[card]?.img_url} >
                        <img  
                        height="320px"
                        src={cards[card]?.img_url} 
                        onClick={() => deleteClick(cards[card]?.id)} 
                        margin="10px">
                        </img>
                        </li>
            ))}
        </div>
    )
}
