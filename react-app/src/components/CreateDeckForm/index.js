import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getDecks } from '../../store/deck';

export const CreateDeckForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
  
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(getDecks(name, description, user));
        if (data) {
          setErrors(data)
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
        </form>
    </div>
    )
}
