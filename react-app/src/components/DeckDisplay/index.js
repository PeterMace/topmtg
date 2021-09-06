import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDeck, deleteDeck } from '../../store/deck';
import { getDeckCards } from '../../store/deck_cards'
import './DeckDisplay.css';
import { UpdateDeckForm } from '../UpdateDeckForm';
import { CardSearch } from '../CardSearch';
import { CardDisplay } from '../CardDisplay'
import { CommentSection } from '../CommentSection'
import { useHistory } from "react-router-dom";

export const DeckDisplay = () => {
    const { deckId }  = useParams();
    const userId = useSelector(state => state.session.user?.id);
    const decks = useSelector(state => state.deck);
    const [showEditForm, setShowEditForm] = useState(false);
    const deck = decks[deckId]
    const isOwner = userId === deck?.userId;
    const dispatch = useDispatch();
    const history = useHistory();

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
        history.push(`/decks/`)
    }


    return (
        <div className="deck-container">
            <div className="deckdisplay-name">
                {deck?.name}
            </div>
            <div className="deck-instructions">
                <h4> Instructions </h4>
                This app will help you quickly build a Commander Deck. Commander is the most popular format of playing Magic the Gathering.
                Commander restricts the deck to have only one copy of any card printed. You cannot add more than one of any card, except land cards(forest, island, etc)
                <br />
                <br />
                To add a card to one of your decks, simply type the card into the search field to the right. Hit the plus button.
                <br />
                <br />
                To remove a remove a card to one of your decks, hover over the card and click.
            </div>
            <div className="deck-description--display">
                Description: {deck?.description}
            </div>
            <br />
            {editForm}
            <div className="deck-buttons">
                {isOwner ? <button onClick={() => setShowEditForm(!showEditForm)}>Edit Deck</button> : null}
                {isOwner ? <button onClick={handleDelete}>Delete Deck</button> : null}
            </div>
            <div className="card-search">
                <div className="form-center">
                    <CardSearch deckId={deckId} />
                </div> 
            </div>
        
            <div className="deck-cards">
                <CardDisplay deckId={deckId} />
            </div>
            <div className="comment-section">
                <CommentSection  deckId={deckId} />
            </div>
        </div>
    )
}
