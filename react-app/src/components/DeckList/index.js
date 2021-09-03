import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getDecks } from '../../store/deck';
import './DeckList.css'

export const DeckList = () => {
    //const decks = useSelector(state => state.decks);
    const dispatch = useDispatch();
    const [decksList, setDeckList] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const data = await dispatch(getDecks());
            setDeckList(data.decks);
        }
        fetchData();
    }, [])

    return (
    <div className="decklist-page">
        <div className="decklist-container">
            <div className="decklist-title">
                <h3> Recently Created Community Decks </h3>
                {/* <p> These decks were recently created by our community          </p> */}
            </div>
            {decksList?.map((deck)=>{
                return (
                    <NavLink key={deck.id} to={`/decks/${deck.id}`}>
                        <div className="decklist-card">
                            <div className="deck-name"> 
                                {deck.name}
                            </div>
                            <div className="deck-description"> 
                                Description: {deck.description}
                            </div>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    </div>
    )
}
