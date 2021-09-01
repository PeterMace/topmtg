import React, {useState, useEffect} from 'react'
import SearchField from "react-search-field";
import { AddDeckCard } from '../AddDeckCard';
import './CardSearch.css';

export const CardSearch = ({deckId}) => {
    const [cardName, setCardName] = useState('');
    const [results, setResults] = useState([]);

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

    const updateCardName = (value, e) => {
        setCardName(value);
    };

    deckId = parseInt(deckId);
    return (
        <div>
            <label>Card Name</label>
            <SearchField
            onChange={updateCardName}
            searchText="Search for a card"
            classNames="test-class"
            />
            <ul>
            {results?.map((card)=>(
                    <li key={card.id}>
                        <span className="search-result">
                            <img height="50px"src={card.small_url} ></img>
                            {card.name}
                            <AddDeckCard cardId={card.id} deckId={deckId} />
                        </span>
                    </li>
            ))}
            </ul>
        </div>
    )
}
