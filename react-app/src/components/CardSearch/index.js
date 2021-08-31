import React, {useState, useEffect} from 'react'
import SearchField from "react-search-field";

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
            results.cards.map((card)=>{
                console.log(card)
            })
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
            placeholder="Search for a card"
            onChange={updateCardName}
            searchText="Search for a card"
            classNames="test-class"
            />

            {results?.map((card)=>(
                    <div>{card.name}
                    </div>
            ))}
        </div>
    )
}
