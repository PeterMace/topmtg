import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createDeck } from '../../store/deck';
import './CreateDeckForm.css'
import { useHistory } from "react-router-dom";

export const CreateDeckForm = () => {
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

  
    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createDeck(name, description, user));
        console.log(data);
        if ('errors' in data) {
          setErrors(data.errors)
        }else{
            history.push(`/decks/${data.id}`)
        }
    };

    
    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const updateName = (e) => {
        setName(e.target.value);
    };
  


    return (
    <div className="createdeck-page">
        <div className="createdeckform-container">
            <form onSubmit ={onSubmit} className="form">
                <div className="form-center">
                    <h3> Create a Deck </h3>
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
                    <textarea
                    name='description'
                    onChange={updateDescription}
                    value={description}
                    ></textarea>
                </div>
                <br />
                <div className="form-center">
                    <button type='submit'>Create Deck</button>
                </div>
            </form>
        </div>
    </div>
    )
}
