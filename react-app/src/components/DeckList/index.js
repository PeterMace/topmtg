import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getDecks } from '../../store/deck';

export const DeckList = () => {
    const decks = useSelector(state => state.decks);
    const dispatch = useDispatch();
  
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getDecks());
        // if (data) {
        //   setErrors(data)
        // }
        console.log(data);
    };

    useEffect(async () => {
        const data = await dispatch(getDecks());
        // if (data) {
        //   setErrors(data)
        // }
        console.log(data);
        // return () => {
        //     cleanup
        // }
    }, [])

    

  


    return (
    <div className="form--container">
        {/* <form onSubmit ={onSubmit} className="form">
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Deck Name</label>
                <input
                type='text'
                name='name'
                onChange={updateName}
                value={name}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <input
                type='text'
                name='description'
                onChange={updateDescription}
                value={description}
                ></input>
            </div>
            <button type='submit'>Create Deck</button>
        </form> */}
    </div>
    )
}
