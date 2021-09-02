import React from 'react'
import { DeckList } from '../DeckList';
import planeswalker from '../../images/planeswalker.png';
import './SplashPage.css';

export const SplashPage = () => {
    return (
        <div className="splash-container">
            <h1 className="splash-title"> Welcome to TopMTG, a magic the gathering deck builder </h1>
            <DeckList />
        </div>
    )
}
