import React, {useState, useEffect} from 'react'

export const CardSearch = () => {
    const [cardName, setCardName] = useState('');
    const [result, setResults] = useState([]);

    useEffect(()=>{
        async function fetchCardResults(){
            const searchResults = await fetch(`/api/cards/search/${cardName}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const cardResults = await searchResults.json();
            console.log(cardResults);
        }
        fetchCardResults()
    }, [cardName])

    const updateCardName = (e) => {
        setCardName(e.target.value);
    };

    return (
        <div>
            <label>Card Name</label>
            <input
            type='text'
            name='name'
            onChange={updateCardName}
            value={cardName}
            ></input>
        </div>
    )
}
