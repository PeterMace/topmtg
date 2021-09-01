import React from 'react'
import { addDeckCard } from '../../store/deck_cards';
import { useDispatch } from 'react-redux'

export const AddDeckCard = ({cardId, deckId}) => {
    const dispatch = useDispatch();
    const onAdd = async (e) => {
        e.preventDefault();
        console.log(cardId, deckId);
        const responseErrors = await dispatch(addDeckCard(cardId, deckId));  
    };

    return (
        <div>
            <button onClick={onAdd}>+</button>
        </div>
    )
}
