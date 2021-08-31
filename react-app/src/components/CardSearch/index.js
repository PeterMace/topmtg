import React, {useState, useEffect} from 'react'
import SearchField from "react-search-field";
import { AddDeckCard } from '../AddDeckCard';

export const CardSearch = () => {
    const [cardName, setCardName] = useState('');
    const [results, setResults] = useState([]);

    useEffect(()=>{
        async function fetchCardResults(){
            const searchResults = await fetch(`/api/cards/search/${cardName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const results = await searchResults.json();
            setResults(results.cards);
        }
        fetchCardResults()
    }, [cardName])

    const updateCardName = (value, e) => {
        setCardName(value);
    };

    return (
        <div>
            <label>Card Name</label>
            <SearchField
            onChange={updateCardName}
            searchText="Search for a card"
            classNames="test-class"
            />

            {results?.map((card)=>(
                    <div>
                        <img height="50px"src={card.art_img} margin="10px"></img>
                        {card.name}
                        <AddDeckCard />
                    </div>
            ))}
        </div>
    )
}
