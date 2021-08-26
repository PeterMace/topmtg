
import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import Modal from "react-modal";
import './NavBar.css';

import topmtgImage from '../../images/TopMTG.png';
import profile from '../../images/profile.png';

const NavBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    console.log("closing", isModalOpen)
  }

  return (
    <nav className="navbar-container">
          <NavLink to='/' exact={true} activeClassName='active'>
            <img src={topmtgImage} alt="Logo"/>
          </NavLink>

          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <button onClick={openModal} className="navbar-profile">
            <img src={profile} className="navbar-profile__image" alt="create" />
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="navbar-modal"
            overlayClassName="navbar-modal__overlay"
            parentSelector={() => document.querySelector(".navbar-profile")}
            // ariaHideApp={false}
          >
            <LogoutButton />
          </Modal>
    </nav>
  );
}

export default NavBar;
