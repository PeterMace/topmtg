import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export const DeckDisplay = () => {
    const { deckId }  = useParams();
    const userId = useSelector(state => state.session.user?.id);
    const decks = useSelector(state => state.deck);
    const deck = decks[deckId]
    console.log(deck, decks, deckId);
    return (
        <div> deck Here
            {deck?.name}
            {deck?.description}
        </div>
    )
}
