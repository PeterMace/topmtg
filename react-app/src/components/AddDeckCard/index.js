import React from 'react'
import { addDeckCard } from '../../store/deck_cards';
import { useDispatch } from 'react-redux';
import gitHub from '../../images/github.png';
import linkedIn from '../../images/linkedIn.png';
import addcard from '../../images/add-card.png';
import './AddDeckCard.css'

export const AddDeckCard = ({cardId, deckId, resetSearch}) => {
    const dispatch = useDispatch();
    const onAdd = async (e) => {
        e.preventDefault();
        const responseErrors = await dispatch(addDeckCard(cardId, deckId));  
        resetSearch();
    };

    return (
        <div className="addCard-Button" >
            <img src={addcard} onClick={onAdd} className="addCard-Button"></img>
        </div>
    )
}
