import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getDeck, deleteDeck} from '../../store/deck';
import {getDeckCards} from '../../store/deck_cards'
import './DeckDisplay.css';
import {UpdateDeckForm} from '../UpdateDeckForm';
import { CardSearch } from '../CardSearch';
import { CardDisplay } from '../CardDisplay'

export const DeckDisplay = () => {
    const { deckId }  = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const decks = useSelector(state => state.deck);
    const [showEditForm, setShowEditForm] = useState(false);
    const deck = decks[deckId]
    
    const isOwner = userId === deck?.userId;

    useEffect(()=>{
        async function fetchDeckData(){
            const data = await dispatch(getDeck(deckId));
            
        }
        fetchDeckData();
        async function fetchCardData(){
            const data = await dispatch(getDeckCards(deckId));
        }
        fetchCardData();
    }, [])

    let editForm = null;
    if (showEditForm){
        editForm = (
            <div>
            <UpdateDeckForm deck={deck} hideForm={() => setShowEditForm(false)} />
            </div>
        )
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await dispatch(deleteDeck(deckId));
    }


    return (
        <div className="deck-container">
            <div className="deck-name">
                {deck?.name}
            </div>

            <div className="deck-description">
                {deck?.description}
            </div>
            <br />
            
            {editForm}
            <div className="deck-buttons">
                {isOwner ? <button onClick={() => setShowEditForm(!showEditForm)}>Edit Deck</button> : null}
                {isOwner ? <button onClick={handleDelete}>Delete Deck</button> : null}
            </div>
            <div className="card-search">
                <CardSearch deckId={deckId} />
            </div>
            <div className="deck-cards">
                <CardDisplay deckId={deckId} />
            </div>
        </div>
    )
}
