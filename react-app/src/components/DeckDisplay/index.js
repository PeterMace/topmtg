import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {getDeck, deleteDeck} from '../../store/deck';
import './DeckDisplay.css';
import {UpdateDeckForm} from '../UpdateDeckForm';
import { CardSearch } from '../CardSearch';

export const DeckDisplay = () => {
    const { deckId }  = useParams();
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const decks = useSelector(state => state.deck);
    const [showEditForm, setShowEditForm] = useState(false);
    const deck = decks[deckId]
    const isOwner = userId === deck?.userId;

    useEffect(()=>{
        async function fetchData(){
            const data = await dispatch(getDeck(deckId));
        }
        fetchData();
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
            {deck?.name}
            <br />
            {deck?.description}
            {editForm}
            {isOwner ? <button onClick={() => setShowEditForm(!showEditForm)}>Edit Deck</button> : null}
            {isOwner ? <button onClick={handleDelete}>Delete Deck</button> : null}
            <CardSearch />
        </div>
    )
}
