import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateDeck } from '../../store/deck';

export const UpdateDeckForm = ({deck, hideForm}) => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState(deck.name);
    const [description, setDescription] = useState(deck.description);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
  
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(updateDeck(deck.id, name, description, user));
        if (data) {
          setErrors(data)
        }
        hideForm();
    };
    
    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };
  


    return (
    <div className="form--container">
        <form onSubmit ={onSubmit} className="form">
            <div>
                { errors.map((error, ind) => (
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
            <button type='submit'>Update Deck</button>
        </form>
    </div>
    )
}
