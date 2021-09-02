
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux'
import Modal from "react-modal";
import './NavBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretSquareDown} from '@fortawesome/free-regular-svg-icons'

import topmtgImage from '../../images/TopMTG.png';
import profile from '../../images/profile.png';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.session.user)

  function flipModal() {
    setIsModalOpen(!isModalOpen);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
  console.log(isModalOpen)

  return (
    <nav className="navbar-container">
          <div>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={topmtgImage} alt="Logo"/>
            </NavLink>
          </div>
        
          <div className="auth-links__container">
            { isAuthenticated && 
              <div className="auth-link">
                  <NavLink to='/login' exact={true} activeClassName='active'>
                    Create Deck
                  </NavLink>
              </div>
            }
              <div className="auth-link">
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  Browse Decks
                </NavLink>
              </div >
          </div>

          <div className="auth-links__container">
          { !isAuthenticated && 
            <>
              <div className="auth-link">
                <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
                </NavLink>
              </div>
              <div className="auth-link">
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
              </div >
            </>
          }
          
          
          
          {isAuthenticated &&  
            <>
            <button  onClick={flipModal} className= "navbar-modal"> 
              {isAuthenticated.username + " "}
              <FontAwesomeIcon icon={faCaretSquareDown} />  
            </button>

              <Modal
              isOpen={isModalOpen}
              className="navbar-modal"
              onRequestClose={flipModal}
              overlayClassName="navbar-modal__overlay"
              ariaHideApp={false}
              parentSelector={() => document.querySelector(".navbar-modal")}
              >
              {isAuthenticated && <LogoutButton closeModal={flipModal} />}
              </Modal>
            </>
          }  
         
          
          </div>
         
          
          
    </nav>
  );
}

export default NavBar;
