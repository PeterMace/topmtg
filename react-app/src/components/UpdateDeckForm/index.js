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
        const responseErrors = await dispatch(updateDeck(deck.id, name, description, user));
        if (responseErrors) {
            setErrors(responseErrors)
        }
        if(!responseErrors) {
            hideForm();
        }    
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
            <div className="form-center">
                <h3> Update Deck </h3>
            </div>
            <div>
                { errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Deck Name</label>
                <br />
                <input
                type='text'
                name='name'
                onChange={updateName}
                value={name}
                ></input>
            </div>
            <div>
                <label>Description</label>
                <br />
                <input
                type='text'
                name='description'
                onChange={updateDescription}
                value={description}
                ></input>
            </div>
            <br />
            <div className="form-center">
                <button type='submit'>Update Deck</button>
            </div>
        </form>
    </div>
    )
}
