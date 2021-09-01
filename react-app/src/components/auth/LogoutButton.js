import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({closeModal}) => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    //closeModal();
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
