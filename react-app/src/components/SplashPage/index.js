import React from 'react'
import { DeckList } from '../DeckList';
import './SplashPage.css';
import { NavLink } from 'react-router-dom';

export const SplashPage = () => {
    return (
        <div className="splash-container">
            <div className="title-container">
                <h1 className="splash-title"> 
                    Welcome to TopMTG, a magic the gathering deck builder 
                </h1>
            </div>
            <br/>
            <div className="splash-grid">
                <div className="step1-container">
                    <h3> Step 1. </h3>
                    Join our community of MTG players.
                    <div className="step-link">
                        <NavLink to='/sign-up' exact={true} activeClassName='active'>
                            Sign Up
                        </NavLink>
                    </div>
                    
                </div >
                <div className="step2-container">
                    <h3>  
                        Step 2. 
                    </h3> 
                    Create your own deck.
                    <div className="step-link">
                        <NavLink to='/decks/create' exact={true} activeClassName='active'>
                            Create Deck
                        </NavLink>
                    </div>
                </div>
                <div className="step3-container">
                    <h3>  
                        Step 3. 
                    </h3> 
                    Browse other decks created by the community.
                    <div className="step-link">
                        <NavLink to='/decks' exact={true} activeClassName='active'>
                            Community Decks
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
