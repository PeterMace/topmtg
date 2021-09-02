import React, { useState } from 'react';
import './CardDelete.css';

export const CardDelete = ({card}) => {
    const [display, setDisplay] = useState("notdisplayed");

    const showButton = e => {
      e.preventDefault();
      setDisplay("displayed");
    };
  
    const hideButton = e => {
      e.preventDefault();
      setDisplay("notdisplayed");
    };

    console.log(card);
    return (
        <div 
        className="deleteContainer"
        // onMouseEnter={e => showButton(e)}
        // onMouseLeave={e => hideButton(e)}
        >
            <img 
            key={card?.id}          
            height="320px"
            src={card?.img_url} 
            margin="10px"
            onMouseEnter={e => showButton(e)}
            onMouseLeave={e => hideButton(e)}
            />

            <button className={display}>I might be an invisible button</button>
        </div>
    )
}
