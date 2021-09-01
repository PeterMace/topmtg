
import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { useSelector } from 'react-redux'
import Modal from "react-modal";
import './NavBar.css';

import topmtgImage from '../../images/TopMTG.png';
import profile from '../../images/profile.png';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useSelector(state => state.session.user)

  function flipModal() {
    setIsModalOpen(true);
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
        
          <div>

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
          
          {isAuthenticated && <LogoutButton />}

          </div>
         
          {/* <button onClick={flipModal} className="navbar-profile">
            <img src={profile} className="navbar-profile__image" alt="create" />
          </button>
          
          
          <Modal
            isOpen={isModalOpen}
            className="navbar-modal"
            overlayClassName="navbar-modal__overlay"
            ariaHideApp={false}
            parentSelector={() => document.querySelector(".navbar-profile")}
          >
           


            
          </Modal> */}
    </nav>
  );
}

export default NavBar;
