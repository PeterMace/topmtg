import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { getDecks } from '../../store/deck';

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
    <div className="form--container">
        <ul>
           {decksList.map((deck)=>{
               return (
                <NavLink key={deck.id} to={`/decks/${deck.id}`}> {deck.name}
                <br />
                {/* <div
                  className="browser-image"
                  style={{ backgroundImage: `url('${deck.imageUrl}')` }}
                ></div> */}
                </NavLink>
               )
           })}
        </ul>
    </div>
    )
}
