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
    
    const resetSearch = () =>{
        setCardName("");
        setResults([]);
    }

    deckId = parseInt(deckId);
    return (
        <div>
            <div className="form-center">
                <label>Search for a card to add</label>
            </div>
            <div className="form-center">
                <SearchField
                onChange={updateCardName}
                searchText="Search for a card"
                classNames="test-class"
                />
            </div>
            <ul>
            {results?.map((card)=>(
                    <li key={card.id}>
                        <span className="search-result">
                            <img key={card.id} height="50px"src={card.small_url} ></img>
                            {card.name}
                            <AddDeckCard cardId={card.id} deckId={deckId} resetSearch={resetSearch}/>
                        </span>
                    </li>
            ))}
            </ul>
        </div>
    )
}
