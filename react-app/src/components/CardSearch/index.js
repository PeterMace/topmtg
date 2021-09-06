import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { AddDeckCard } from '../AddDeckCard';
import './CardSearch.css';

export const CardSearch = ({deckId}) => {
    const [cardName, setCardName] = useState('');
    const [results, setResults] = useState([]);
    const userId = useSelector(state => state.session.user?.id);
    const decks = useSelector(state => state.deck);

    useEffect(()=>{
        async function fetchCardResults(){
            if(cardName){
                const searchResults = await fetch(`/api/cards/search/${cardName}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const results = await searchResults.json();
                setResults(results.cards);
            }
        }
        fetchCardResults()
    }, [cardName])

    const updateCardName =  (e) => {
        setCardName(e.target.value);
    };
    
    const resetSearch = async () =>{
        // setCardName("");
        console.log("cardName", cardName);
        await setResults([]);
        await setCardName("");
        // await updateCardName("");
        console.log("cardName", cardName);
    }

    deckId = parseInt(deckId);
    const isOwner = decks[deckId]?.userId === userId;
    return (
        <div>
            <div className="form-center">
                <label>Search for a card to add</label>
            </div>
            <div className="form-center">
                <input
                value={cardName}
                onChange={updateCardName}
                placeholder="Search for a card"
                />
            </div>
            <ul>
            {results?.map((card)=>(
                    <li key={card.id}>
                        <span className="search-result">
                            <img key={card.id} height="50px"src={card.small_url} ></img>
                            {card.name}
                            {isOwner && <AddDeckCard cardId={card.id} deckId={deckId} resetSearch={resetSearch}/>}
                        </span>
                    </li>
            ))}
            </ul>
        </div>
    )
}
